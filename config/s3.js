import dotenv from 'dotenv'
import aws from 'aws-sdk'

dotenv.config()

const s3 = new aws.S3({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,       
      secretAccessKey: process.env.SECRET_ACCESS_KEY        
    },
   region: process.env.REGION,    
   params: {       
      ACL: 'public-read',                          //ver acá si conviene esto, o si se hará por validación de grupo de usuarios
      Bucket: process.env.AWS_BUCKET        
    }   
  })
  
  console.log('s3\n', s3)
  export default s3
