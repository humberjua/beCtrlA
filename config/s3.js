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
      Bucket: process.env.AWS_BUCKET,
      // ACL: 'FULL_CONTROL'
    }   
  })
  
  
  console.log('Connected with AWS S3, at:', s3.endpoint.host)
  export default s3
