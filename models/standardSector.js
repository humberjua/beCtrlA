import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import {v1 as uuid} from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idStandardSector: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   standardSectorDescription: {
      type: String,
      required: true,
      unique:true,
      minLength:5      
   }      
})

schema.plugin(uniqueValidator)

export const standardSector = mongoose.model('standardSector', schema) 

//definitions (type)
export const gqlSS =`
type standardSector {
   idStandardSector: ID!
   standardSectorDescription: String!
}

`

//definitions (query)
export const gqlQSS = `
allStandardSectors:[standardSector]!

`

//definitions (mutation)
export const gqlMSS = `
addNewStandardSector(
   standardSectorDescription:String!
):standardSector
editStandardSectorDescription(
   idStandardSector:ID!
   standardSectorDescription:String!
):standardSector

`

//resolvers (query)
export const allStandardSectors = async () => {
   return await standardSector.find({})
   //returns all the standard sector data
}


//resolvers (mutation)
export const addNewStandardSector = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const newSS = new standardSector({ ...args, idStandardSector: uuid() })
   try {
      await newSS.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return newSS
}
export const editStandardSectorDescription = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const sS = await standardSector.findOne({ idStandardSector: args.idStandardSector })
   if (!sS) return
   
   sS.standardSectorDescription = args.standardSectorDescription

   try {
      await sS.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return sS
}