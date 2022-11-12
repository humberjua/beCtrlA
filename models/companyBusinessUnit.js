import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { AuthenticationError, UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idCompanyBusinessUnit: {
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
   companyBusinessUnitDescription: {
      type: String,
      required: true,
      minLength:5      
   }      
})

schema.plugin(uniqueValidator)

export const companyBusinessUnit = mongoose.model('companyBusinessUnit', schema) 
//export default mongoose.model('companyBusinessUnit', schema) 


//definitions (type)
export const gqlCBU = `
type companyBusinessUnit {
   idCompanyBusinessUnit: ID!
   idCompany:ID!
   companyName:String!
   companyBusinessUnitDescription:String!   
}

`

//definitions (query)
export const gqlQCBU = `
companyBusinessUnitCount(companyName:String!): Int!
allBusinessUnits: [companyBusinessUnit]!
businessUnitsFrom(companyName:String!): [companyBusinessUnit]

`

//definitions (mutation)
export const gqlMCBU = `
addNewCompanyBusinessUnit(
   idCompany:ID!
   companyName:String!
   companyBusinessUnitDescription:String!
): companyBusinessUnit
editCompanyBusinessUnitDescription(
   idCompanyBusinessUnit:ID!         
   companyBusinessUnitDescription:String!
): companyBusinessUnit

`

//resolvers (query)
export const companyBusinessUnitCount = async (root, args) => {
   const cBUC = await companyBusinessUnit.find({ companyName: args.companyName })       
   return cBUC.length
   // returns the amount of business units of the company sought
}
export const allBusinessUnits = async () => {
   return await (await companyBusinessUnit.find({}))
   //al business units from all companies... just for admin purposes
}
export const businessUnitsFrom = async (root, args) => {   
   return await companyBusinessUnit.find({ companyName: args.companyName })         
   // returns the business units data of the company sought
}


//resolvers (mutation)
export const addNewCompanyBusinessUnit = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const newCBU = new companyBusinessUnit({ ...args, idCompanyBusinessUnit: uuid() })         
   try {
      await newCBU.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return newCBU
   //adds one new company's unit business
}
export const editCompanyBusinessUnitDescription = async (root, args, {currentUser}) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const bu = await companyBusinessUnit.findOne({ idCompanyBusinessUnit: args.idCompanyBusinessUnit })
   if (!bu) return
   
   bu.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   try {
      await bu.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return bu
   // edits the description text of the company's unit business
}