import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { AuthenticationError, UserInputError } from "apollo-server"

// collection for the main data of the company, contact, address, phone, etc 
const schema = new mongoose.Schema({
   idCompany: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   companyName: {
      type: String,
      required: true,
      minLength:3      
   },
   companyCategory: {
      type: String,
      required: true,
      minLength:3      
   },
   headQuartersCountry: {
      type: String,
      required: true,
      minLength:5      
   },
   headQuartersCity: {
      type: String,
      required: true,
      minLength:3      
   },
   headQuartersStreet: {
      type: String,
      required: true,
      minLength:5      
   },
   headQuartersNumber: {
      type: String,
      required: true,
      minLength:1      
   },
   headQuartersZipCode: {
      type: String,
      required: true,
      minLength:3      
   },
   address: {
      type: String,
      required: false,
      minLength:6      
   },
   headQuartersMainContactPhone: {
      type: String,
      required: false,
      minLength:3      
   },
   headQuartersMainContactEmail: {
      type: String,
      required: true,
      minLength:8      
   },
   companyInternalDescription: {
      type: String,
      required: true,
      minLength:5      
   },
   companyLogo: {
      type: String,
      required: false,
      minLength:10      
   }      
})


schema.plugin(uniqueValidator)

export const companyData = mongoose.model('companyData', schema) 


//definitions (type)
export const gqlCD =`
type companyData {
   idCompany: ID!
   companyName: String!
   companyCategory:String!
   headQuartersCountry:String!      
   headQuartersCity:String!
   headQuartersStreet:String!
   headQuartersNumber:String!
   headQuartersZipCode:String!
   address:String
   headQuartersMainContactPhone:String
   headQuartersMainContactEmail:String!
   companyInternalDescription:String!
   companyLogo:String
}

`
// *** la fila en blanco abajo del } es importante ***


//definitions (query)
export const gqlQCD = `
companyCount: Int!
allCompanies: [companyData]!
findCompany(companyName: String! ): companyData

`

//definitions (mutation)
export const gqlMCD = `
   addNewCompany(
      companyName: String!
      companyCategory:String!
      headQuartersCountry:String!
      headQuartersCity:String!
      headQuartersStreet:String!
      headQuartersNumber:String!
      headQuartersZipCode:String!            
      headQuartersMainContactPhone:String!
      headQuartersMainContactEmail:String!
      companyInternalDescription:String!
      companyLogo:String!
   ): companyData
   editCompanyData(
      idCompany:ID!
      companyName: String
      companyCategory:String
      headQuartersCountry:String
      headQuartersCity:String
      headQuartersStreet:String
      headQuartersNumber:String
      headQuartersZipCode:String
      headQuartersMainContactPhone:String
      headQuartersMainContactEmail:String
      companyInternalDescription:String
      companyLogo:String         
   ): companyData

`

//resolvers (query)
export const companyCount = async () => await companyData.collection.countDocuments()   //how many companies have Ctrl+A implemented
export const allCompanies = async () => {
   return await companyData.find({})      //wich companies have Ctrl+A implemented
}
export const findCompany = async (root, args) => {      
   return await companyData.findOne({ companyName: args.companyName })   //returns the data of the company sought         
}


//resolvers (mutation)
export const addNewCompany = async (root, args, { currentUser }) => {         
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const newCompany = new companyData({ ...args, idCompany: uuid() })

   try {
      await newCompany.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return newCompany 
   //adds a new company in the companyData collection
}
export const editCompanyData = async (root, args, {currentUser}) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const company = await companyData.findOne({ idCompany: args.idCompany })
   if (!company) return
   
   //hay que ir *** campo por campo ***, ver si puso o no puso el dato, si lo puso, guardar el nuevo y seguir         
   if (args.companyName) company.companyName = args.companyName
   if (args.companyCategory) company.companyCategory = args.companyCategory
   if (args.headQuartersCountry) company.headQuartersCountry = args.headQuartersCountry
   if (args.headQuartersCity) company.headQuartersCity = args.headQuartersCity
   if (args.headQuartersStreet) company.headQuartersStreet = args.headQuartersStreet
   if (args.headQuartersNumber) company.headQuartersNumber = args.headQuartersNumber
   if (args.headQuartersZipCode) company.headQuartersZipCode = args.headQuartersZipCode
   if (args.headQuartersMainContactPhone) company.headQuartersMainContactPhone = args.headQuartersMainContactPhone
   if (args.headQuartersMainContactEmail) company.headQuartersMainContactEmail = args.headQuartersMainContactEmail
   if (args.companyInternalDescription) company.companyInternalDescription = args.companyInternalDescription
   if (args.companyLogo) company.companyLogo = args.companyLogo
   
   try {
      await company.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return company
}
// edits the companyData with only those parameters indicated