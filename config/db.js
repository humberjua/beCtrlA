import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology:true  
 })
  .then(() => {   
   console.log('connected to MongoDB on db:' + mongoose.connection.db.databaseName + ', at ' + mongoose.connection.host)
 }).catch(error=> {
   console.log('Error connection to MongoDB.',error.message)
 })