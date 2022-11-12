import { AuthenticationError } from "apollo-server"
import fs from 'fs'
import {v4 as uuid} from 'uuid'
import s3 from '../config/s3.js'
import { standardTicketsCount , allStandardTickets } from "./standardTicket.js"

//let fs = require('fs')

//definitions (Type)
export const gqlS3 =`
    type File {
        success : String!
        message : String!
        mimetype : String
        encoding : String
        filename : String
        location : String
    }

`

//definitions (Query)
export const gqlQS3 =`
uploadedFiles : [File]

`

//definitions (Mutation)
export const gqlMS3 =`
singleUploadLocal (file: Upload!) : File
multipleUploadLocal (files: [Upload]!) : [File]
singleUploadS3 (file : Upload!) : File
multipleUploadS3 (files : [Upload]!) : [File]

`

//resolvers (Query)
/* *** Falta *** */



//resolvers (Mutation)
//uploads one single file to local storage if its called with singleUploadLocal function, 
//And this function is called multiple times with multipleUploadLocal function aswell
const processUpload = async (file)=>{
    const {createReadStream, mimetype, encoding, filename} = await file;
    let path = "uploads/" + uuid() + filename;
    let stream = createReadStream();
    return new Promise((resolve,reject)=>{
        stream
        .pipe(fs.createWriteStream(path))
        .on("finish", ()=>{

            resolve({
                success: true,
                message: "Successfully Uploaded",
                mimetype, filename, encoding, location: path
            })
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
//And this function can be called multiple times with multipleUploadS3 function aswell
let processUploadS3 = async (file)=>{
    const {createReadStream, mimetype, encoding, filename} = await file;
    let stream = createReadStream();
    const {Location} = await s3.upload({
        Body: stream,
        Key: `${uuid()}${filename}`,
        ContentType: mimetype
    }).promise();
    return new Promise((resolve,reject)=>{
        if (Location){
            resolve({
                success: true, message: "Uploaded", mimetype,filename,
                location: Location, encoding
            })
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

let filesAccepted = () => {
    filesAccepted = ["jpg", "jpeg", "png", "mp4", "mpeg", "avi"]
    // let n = standardTicketsCount
    // for (let i = 0; i < n; i++){
    //     let newFormats = allStandardTickets.filter({
    //         format1Image: !filesAccepted(0),
    //         format1Image: !filesAccepted(1),
    //         format1Image: !filesAccepted(2),
    //         format2Image: !filesAccepted(0),
    //         format2Image: !filesAccepted(1),
    //         format2Image: !filesAccepted(2),
    //         format3Image: !filesAccepted(0),
    //         format3Image: !filesAccepted(1),
    //         format3Image: !filesAccepted(2),
    //         format1Video: !filesAccepted(3),
    //         format1Video: !filesAccepted(4),
    //         format1Video: !filesAccepted(5),
    //         format2Video: !filesAccepted(3),
    //         format2Video: !filesAccepted(4),
    //         format2Video: !filesAccepted(5),
    //         format3Video: !filesAccepted(3),
    //         format3Video: !filesAccepted(4),
    //         format3Video: !filesAccepted(5)
    //     })
    //     if (newFormats.length > 0) filesAccepted.concat(newFormats)
    // }

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


export const singleUploadLocal = async (_, args, { currentUser }) => {
    if (!currentUser) throw new AuthenticationError('Bad credentials')

    if (filesAccepted.includes(args.file.mimetype)) return await processUpload(args.file.file)  
}
export const multipleUploadLocal = async (_, args, { currentUser }) => {
    if (!currentUser) throw new AuthenticationError('Bad credentials')

    const filesServer = await Promise.all(args.files.map(({promise}) => promise))

    let acepted = filesServer.filter((file) => {
        if (filesAccepted.includes(file.mimetype)) {
            return file
        }
    })
    console.log(acepted)

    let obj =  (await Promise.all(acepted)).map(processUpload);
    console.log(obj);
    return obj;
}
export const singleUploadS3 = async (_, args, {currentUser}) => {
    if (!currentUser) throw new AuthenticationError('Bad credentials')

    return await processUploadS3(args.file);
}
export const multipleUploadS3 = async (_, args, { currentUser }) => {
    if (!currentUser) throw new AuthenticationError('Bad credentials')

    let obj = (await Promise.all(args.files)).map(processUploadS3);
    return obj;
}