import fs from 'fs'
import {v4 as uuid} from 'uuid'
import s3 from '../config/s3.js'
import { allStandardTickets } from "./standardTicket.js"
import dotenv from 'dotenv'
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { AuthenticationError, UserInputError } from "apollo-server"


dotenv.config()

const schema = new mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        required: true
    },
    mimetype: {
        type: String,
        unique: false,
        required: false
    },
    encoding: {
        type: String,
        unique: false,
        required: false
    },
    success: {
        type: Boolean,
        required: false
    },
    message: {
        type: String,
        unique: false,
        required: false
    },
    location: {
        type: String,
        unique: false,
        required: false
    },
    url: {
        type: String,
        unique: false,
        required: false
    }
}, {timestamps: true})

schema.plugin(uniqueValidator)

export const storedFile = mongoose.model('storedFile', schema) 

//definitions (Type)
export const gqlS3 =`#graphql    
    type File {
        filename: String
        mimetype: String
        encoding: String
        success: String
        message: String
        location: String
        url: String
    }

`

//definitions (Query)
export const gqlQS3 =`#graphql
getFiles:[File]
getFile(filename:String!):File
getStoredFiles:[File]
getStoredFile(filename:String!):File
getFileURL(filename:String!):String
# downloadFile(filename:String!):File

`

//definitions (Mutation)
export const gqlMS3 =`#graphql
singleUploadLocal (file: Upload!): File!
multipleUploadLocal (files: [Upload]): [File]
singleUploadS3 (file: Upload): File
multipleUploadS3 (files: [Upload]): [File]

`

// Function to obtain signedURL for the image
export const getFileURL = async (_, {filename}) => {    
    const client = new S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    })
    // console.info('filename\n', filename)
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: filename
    })
    // Por ahora dura 1 hora
    return await getSignedUrl(client, command, {expiresIn: 3600 })
}

//Internal function to obtain signedURL for the image
const getFileURL_2 = async (filename) => {    
    const client = new S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    })
    // console.info(filename)
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: filename
    })
    // Por ahora dura 1 hora
    return await getSignedUrl(client, command, {expiresIn: 3600 })
}


//resolvers (Query)
//MongoQuery for storedFile collection
export const getStoredFiles = async () => {
    return await storedFile.find({})
}
export const getStoredFile = async (_, {filename}) => {
    return await storedFile.findOne({ filename: filename })
}
//AWS S3 Query
export const getFiles = async () => {
    // This function returns the stored files list from Amazon S3.
    const { Contents } =  await s3.listObjects({
        Bucket: process.env.AWS_BUCKET
    }).promise()
    
    return Contents.map(async el => {
        
        return (
            {
                filename: el.Key,
                mimetype: el.Key.split('.').pop(),
                encoding: el.StorageClass,
                success: true,
                message: `Last Modified: ${el.LastModified.toLocaleDateString()}, ${el.LastModified.toLocaleTimeString()}, size:${Math.round(el.Size/1024)}[MB]`,
                location: `${s3.endpoint.protocol}//${process.env.AWS_BUCKET}.${s3.endpoint.host}/${el.Key}`,
                url: await getFileURL_2(el.Key)
            }
        )
    })
}

export const getFile = async (_, {filename}) => {
    
    const { Contents } =  await s3.listObjects({
        Bucket: process.env.AWS_BUCKET
    }).promise()
    
    let result = Contents.filter(el => el.Key === filename)
    if (result.length === 0) return
    let tempUrl = await getFileURL_2(result[0].Key)
    if (result) {
        return {
            filename: result[0].Key,
            mimetype: result[0].Key.split('.').pop(),
            encoding: result[0].StorageClass,
            success: true,
            message: `Last Modified: ${result[0].LastModified.toLocaleDateString()}, ${result[0].LastModified.toLocaleTimeString()}, size:${Math.round(result[0].Size/1024)}[MB]`,
            location: `${s3.endpoint.protocol}//${process.env.AWS_BUCKET}.${s3.endpoint.host}/${result[0].Key}`,
            url: tempUrl
        }
    }
}

// export async function downloadFile (_, {filename}) {
//     const client = new S3Client({
//         region: process.env.REGION,
//         credentials: {
//             accessKeyId: process.env.ACCESS_KEY_ID,
//             secretAccessKey: process.env.SECRET_ACCESS_KEY
//         }
//     })
//     const command = new GetObjectCommand({
//         Bucket: process.env.AWS_BUCKET,
//         Key: filename
//     })
//     let result
//     try {
//         result = await client.send(command) 
//         if (result) {
//             const signedURL = await getSignedUrl(client, command, {expiresIn: 3600})
//             let fullResponse = { ...result, 'url':signedURL }
//             console.log(fullResponse)
//             result.Body.pipe(fs.createWriteStream(`../images/${filename}`))
//             return fullResponse
//         }
//         return result.Contents
//     } catch (error) {
//         result = "ups..."
//     }
// }


//resolvers (Mutation)
//uploads one single file to local storage if its called with singleUploadLocal function, 
//And this function is called multiple times with multipleUploadLocal function aswell
async function processUpload (file) {        
    const {createReadStream, mimetype, encoding, filename} = await file;
    const extension = filename.split('.').pop()
    const newName = `${uuid()}.${extension}`
    const newSuccessMessage = `Uploaded file <${filename}>, as <${newName}>. On Local Server`
    let path = `uploads/${newName}`;

    const result = {
        filename: newName,
        mimetype,
        encoding,
        success: true,
        message: newSuccessMessage,
        location: path,
        url: ''
    }

    let stream = createReadStream();
    return new Promise((resolve,reject)=>{
        stream
        .pipe(fs.createWriteStream(path))
        .on("finish", async () => {
            await storedFile.create(result)
            resolve(result)
        })
        .on("error", (err)=>{
            console.log("Error Event Emitted")
            reject({
                success: false,
                message: "Failed"
            })
        })
    })
}

//Quite similar to the previous function but uploads one single file to s3 storage if its called with singleUploadS3 function, 
//And this function can be called multiple times with multipleUploadS3 function as well in order to upload multiple files
let processUploadS3 = async (file)=>{
    file.name ? file.filename=file.name : file.filename = file.filename    
    console.log('file into processUploadS3\n', file)
    const {createReadStream, mimetype, encoding, filename} = await file;
    const extension = filename.split('.').pop()
    const newName = `${uuid()}.${extension}`
    const newSuccessMessage = `Uploaded file <${filename}>, as <${newName}>. On cloud AWS S3`

    let stream = file.createReadStream();
    
    const {Location} = await s3.upload({
        Key: newName,
        Body: stream,
        ContentType: mimetype
    }).promise();
    const result = {
        filename: newName,
        mimetype,
        encoding,
        success: true,
        message: newSuccessMessage,        
        url: await getFileURL_2(newName) // no tiene sentido guardarla ya que es temporal por 1 hora...
    }
    return new Promise(async (resolve,reject) => {
        if (Location){      
            await storedFile.create({...result, location: Location})
            resolve({...result, location: Location})
        }else {
            reject({
                success: false, message: "Failed"
            })
        }
    })
}

/* *** 
    En esta parte intento agregarle a "filesAccepted" solamente aquellos formatos que estén
    especificados en cualquiera de los "standardTickets" en los campos del "formatImage" 1 al 3 y del "formatVideo" 1 al 3
    Con lo cual, al final debe devolver un filesAccepted >= al filesAccepted previo a la recorrida
*** */

function filesAccepted () {
    return ["jpg", "jpeg", "png", "mp4", "mpeg", "avi"]
    /*
        let n = standardTicketsCount
        for (let i = 0; i < n; i++){
            let newFormats = allStandardTickets.filter({
                format1Image: !filesAccepted(0),
                format1Image: !filesAccepted(1),
                format1Image: !filesAccepted(2),
                format2Image: !filesAccepted(0),
                format2Image: !filesAccepted(1),
                format2Image: !filesAccepted(2),
                format3Image: !filesAccepted(0),
                format3Image: !filesAccepted(1),
                format3Image: !filesAccepted(2),
                format1Video: !filesAccepted(3),
                format1Video: !filesAccepted(4),
                format1Video: !filesAccepted(5),
                format2Video: !filesAccepted(3),
                format2Video: !filesAccepted(4),
                format2Video: !filesAccepted(5),
                format3Video: !filesAccepted(3),
                format3Video: !filesAccepted(4),
                format3Video: !filesAccepted(5)
            })
            if (newFormats.length > 0) filesAccepted.concat(newFormats)
        }
    
    */

    allStandardTickets.reduce((formats, sT) => {
        
        formats = Array.from(new Set([...formats, ...sT.format1Image]))
        formats.concat(Array.from(new Set([...formats, ...sT.format2Image])))
        formats.concat(Array.from(new Set([...formats, ...sT.format3Image])))
        formats.concat(Array.from(new Set([...formats, ...sT.format1Video])))
        formats.concat(Array.from(new Set([...formats, ...sT.format2Video])))
        formats.concat(Array.from(new Set([...formats, ...sT.format3Video])))
        //En este punto formats es una lista sin repetir elementos, de los diferentes formatos que se aceptan de 
        //imagenes y de videos en la aplicación
        //Estos formatos fueron cargados como tal, en las collections "standardTicket", en los campos que van del
        //format1Image al format3Image y del format1Video, al format3Video.

        return Array.from(new Set([...formats,...filesAccepted]))
        
    },[])


    return filesAccepted
}


export async function singleUploadLocal (_, {file}, { currentUser }) {
    if (!currentUser) throw new AuthenticationError('Bad credentials')
    let newFile
    file.file? newFile = file.file : newFile = file

    //if (filesAccepted(file.file.mimetype)) return await processUpload(file.file)  
    return await processUpload(newFile)

}
export async function multipleUploadLocal (_, {files}, { currentUser }) {
    if (!currentUser) throw new AuthenticationError('Bad credentials')
    let newFiles
    files.files? newFiles = files.files : newFiles = files
    
    const filesServer = await Promise.all(newFiles.map(({promise}) => promise))

    let acepted = filesServer.filter((file) => {
        if (filesAccepted(file.mimetype)) {
            return file
        }
    })
    console.log(acepted)

    let obj =  (await Promise.all(acepted)).map(processUpload);
    
    console.log(obj);
    return obj;
}
export async function singleUploadS3 (_, {file}, {currentUser}) {    
    if (!currentUser) throw new AuthenticationError('Bad credentials')
    let newFile
    file.file? newFile = file.file : newFile = file

    // if (filesAccepted(file.mimeType.split('/').pop())) return await processUploadS3(file.file)
    return await processUploadS3(newFile)
}
export async function multipleUploadS3 (_, {files}, { currentUser }) {
    if (!currentUser) throw new AuthenticationError('Bad credentials')
    let newFiles
    files.files? newFiles = files.files : newFiles = files

    const filesServer = await Promise.all(newFiles.map(({promise}) => promise))

    let acepted = filesServer.filter((file) => {
        if (filesAccepted(file.mimetype)) {
            return file
        }
    })
    console.log(acepted)
 
    let obj = (await Promise.all(acepted)).map(processUploadS3);
    return obj;
}