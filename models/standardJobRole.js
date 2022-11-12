import mongoose, { syncIndexes } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idStandardJobRole: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   standardJobRoleDescription: {
      type: String,
      required: true,
      minLength:3      
   },
   internalId: {
      type: String,
      unique: true,
      required: false
   },
   reserved: {
      type: Boolean,
      default: false
   }
})

schema.plugin(uniqueValidator)

export const standardJobRole = mongoose.model('standardJobRole', schema) 

//type definitions (type)
export const gqlSJR = `
type standardJobRole{
   idStandardJobRole: ID!
   standardJobRoleDescription:String!
   internalId: String
   reserved: Boolean
}

`

//type definitions (Query)
export const gqlQSJR = `
allStandardJobRoles: [standardJobRole]!
`

//type definitions (Mutation)
export const gqlMSJR = `
addNewStandardJobRole(
   standardJobRoleDescription: String!
   internalId: String
   reserved: Boolean
): standardJobRole
editStandardJobRoleDescription(
   idStandardJobRole: ID!
   standardJobRoleDescription:String!
): standardJobRole

`

//resolvers, queries
export const allStandardJobRoles = async () => {
   return await standardJobRole.find({})
   //returns all standard job roles loaded in the CTRL+A mongoDB
}

//resolvers, mutations
export const addNewStandardJobRole = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const newSJR = new standardJobRole({ ...args, idStandardJobRole: uuid() })
   try {
      await newSJR.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return newSJR
   //adds one new Standard Job Role to the specific collection. Just for admin purposes         
}
export const editStandardJobRoleDescription = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const sJR = await standardJobRole.findOne({ idStandardJobRole: args.idStandardJobRole })
   if (!sJR) return

   sJR.standardJobRoleDescription = args.standardJobRoleDescription         
   try {
      await sJR.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs:args
      })
   }
   return sJR
   //updates the selected standardJobRoleDescription
}