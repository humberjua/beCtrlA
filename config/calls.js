import {config} from 'dotenv'

config()

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET
export const AWS_REGION = process.env.REGION
export const AWS_ACCESS_KEY = process.env.ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY
export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET

