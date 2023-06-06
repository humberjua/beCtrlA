import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idCompanyJobRole: {
      type: String,
      unique: true,
      required: true,
      minLength:8
   },
   idCompany: {
      type: String,
      required: true,
      minLength:8
   },
   companyName: {
      type: String,
      required: true,
      minLength:3
   },
   idCompanyBusinessUnit: {
      type: String,
      required: true,
      minLength:8
   },
   companyBusinessUnitDescription: {
      type: String,
      required: true,
      minLength:5
   },
   idCompanySector: {
      type: String,
      required: true,
      minLength:8
   },
   companySectorDescription: {
      type: String,
      required: true,
      minLength:5
   },
   idStandardJobRole: {
      type: String,
      required: true,
      minLength:8
   },
   standardJobRoleDescription: {
      type: String,
      required: true,
      minLength:5
   },
   companyJobRoleDescription: {
      type: String,
      required: true,
      minLength:5
   }
})

schema.plugin(uniqueValidator)

export const companyJobRole = mongoose.model('companyJobRole', schema) 


//definitions (type)
export const gqlCJR = `
type companyJobRole {
   idCompanyJobRole:ID!
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idCompanySector:ID!
   companySectorDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   companyJobRoleDescription:String!
}

`

//definitions (query)
export const gqlQCJR = `
allCompanyJobRoles(companyName:String!): [companyJobRole]!

`

//definitions (mutation)
export const gqlMCJR = `
addNewCompanyJobRole(   
   idCompany: ID!
   companyName: String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idCompanySector:ID!
   companySectorDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   companyJobRoleDescription:String!
): companyJobRole
editCompanyJobRoleDescription(
   idCompanyJobRole:ID!         
   companyJobRoleDescription:String!
): companyJobRole

`

//resolvers (query)
export const allCompanyJobRoles = async (root, args) => {   
   return await companyJobRole.find({ companyName: args.companyName })         
   // returns all the job roles from the company you are looking for
}

//resolvers (mutation)
export const addNewCompanyJobRole = async (root, args, { currentUser }) => {         
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const newCJR = new companyJobRole({ ...args, idCompanyJobRole: uuid() })
   
   try {
      await newCJR.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   
   //return await newCJR.save()

   return newCJR
   // adds one new type company's jobe role
}
export const editCompanyJobRoleDescription = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const cJR = await companyJobRole.findOne({ idCompanyJobRole: args.idCompanyJobRole })
   if (!cJR) return

   cJR.companyJobRoleDescription = args.companyJobRoleDescription
   try {
      await cJR.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return cJR
   // edits the description text of the company's job role 
}