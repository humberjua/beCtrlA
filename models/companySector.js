import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idCompanySector: {
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
   idStandardSector: {
      type: String,
      required: true,
      minLength:8      
   },
   standardSectorDescription: {
      type: String,
      required: true,
      minLength:5      
   },
   companySectorDescription: {
      type: String,
      required: true,
      minLength:5      
   },
   companySectorPLineQuantity: {
      type: Number,
      required: true,
   },
   pLine1X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine1Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine1Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine2X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine2Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine2Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine3X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine3Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine3Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine4X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine4Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine4Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine5X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine5Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine5Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine6X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine6Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine6Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine7X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine7Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine7Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine8X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine8Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine8Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine9X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine9Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine9Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine10X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine10Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine10Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine11X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine11Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine11Z: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine12X: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine12Y: {
      type: String,
      required: false,
      minLength:3      
   },
   pLine12Z: {
      type: String,
      required: false,
      minLength:3      
   }
})

schema.plugin(uniqueValidator)

export const companySector = mongoose.model('companySector', schema) 


//definitions (type)
export const gqlCS = `
type companySector {
   idCompanySector:ID!
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idStandardSector:ID!
   standardSectorDescription:String!
   companySectorDescription:String!
   companySectorPLineQuantity:Int!
   pLine1X:String
   pLine1Y:String
   pLine1Z:String
   pLine2X:String
   pLine2Y:String
   pLine2Z:String
   pLine3X:String
   pLine3Y:String
   pLine3Z:String
   pLine4X:String
   pLine4Y:String
   pLine4Z:String
   pLine5X:String
   pLine5Y:String
   pLine5Z:String
   pLine6X:String
   pLine6Y:String
   pLine6Z:String
   pLine7X:String
   pLine7Y:String
   pLine7Z:String
   pLine8X:String
   pLine8Y:String
   pLine8Z:String
   pLine9X:String
   pLine9Y:String
   pLine9Z:String
   pLine10X:String
   pLine10Y:String
   pLine10Z:String
   pLine11X:String
   pLine11Y:String
   pLine11Z:String
   pLine12X:String
   pLine12Y:String
   pLine12Z:String
}

`

//definitions (query)
export const gqlQCS = `
allcompanySectors(companyName:String!):[companySector]!

`

//definitions (mutation)
export const gqlMCS = `
addNewCompanySector(
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idStandardSector:ID!
   standardSectorDescription:String!
   companySectorDescription:String!
   companySectorPLineQuantity:Int!
   pLine1X:String
   pLine1Y:String
   pLine1Z:String
   pLine2X:String
   pLine2Y:String
   pLine2Z:String
   pLine3X:String
   pLine3Y:String
   pLine3Z:String
   pLine4X:String
   pLine4Y:String
   pLine4Z:String
   pLine5X:String
   pLine5Y:String
   pLine5Z:String
   pLine6X:String
   pLine6Y:String
   pLine6Z:String
   pLine7X:String
   pLine7Y:String
   pLine7Z:String
   pLine8X:String
   pLine8Y:String
   pLine8Z:String
   pLine9X:String
   pLine9Y:String
   pLine9Z:String
   pLine10X:String
   pLine10Y:String
   pLine10Z:String
   pLine11X:String
   pLine11Y:String
   pLine11Z:String
   pLine12X:String
   pLine12Y:String
   pLine12Z:String
): companySector
editCompanySector(
   idCompanySector:ID!
   companySectorDescription:String!
   companySectorPLineQuantity:Int!
   pLine1X:String
   pLine1Y:String
   pLine1Z:String
   pLine2X:String
   pLine2Y:String
   pLine2Z:String
   pLine3X:String
   pLine3Y:String
   pLine3Z:String
   pLine4X:String
   pLine4Y:String
   pLine4Z:String
   pLine5X:String
   pLine5Y:String
   pLine5Z:String
   pLine6X:String
   pLine6Y:String
   pLine6Z:String
   pLine7X:String
   pLine7Y:String
   pLine7Z:String
   pLine8X:String
   pLine8Y:String
   pLine8Z:String
   pLine9X:String
   pLine9Y:String
   pLine9Z:String
   pLine10X:String
   pLine10Y:String
   pLine10Z:String
   pLine11X:String
   pLine11Y:String
   pLine11Z:String
   pLine12X:String
   pLine12Y:String
   pLine12Z:String
): companySector

`

//resolvers (query)
export const allcompanySectors = async (root, args) => {   
   return await companySector.find({companyName:args.companyName})        
   //returns all sectors from the company you are looking for
}


//resolvers (mutation)
export const addNewCompanySector = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const newCS = new companySector({ ...args, idCompanySector: uuid() })

   //return await newCS.save()
   try {
      await newCS.save()
      } catch (error) {
         throw new UserInputError(error.message, {
            invalidArgs: args               
         })
      }
   return newCS 
   //adds one new company's work sector
}
export const editCompanySector = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   //desde el FE cuando se llame esta función se le deberá pasar el idCompanySector y el resto de parámetros será opcional
   
   const cS = await companySector.findOne({ idCompanySector: args.idCompanySector })
   if (!cS) return

   if (args.companySectorDescription) cS.companySectorDescription = args.companySectorDescription
   if(args.companySectorPLineQuantity) cS.companySectorPLineQuantity = args.companySectorPLineQuantity
   if(args.pLine1X) cS.pLine1X = args.pLine1X
   if(args.pLine1Y) cS.pLine1X = args.pLine1Y
   if(args.pLine1Z) cS.pLine1X = args.pLine1Z
   if(args.pLine2X) cS.pLine2X = args.pLine2X
   if(args.pLine2Y) cS.pLine2X = args.pLine2Y
   if(args.pLine2Z) cS.pLine2X = args.pLine2Z
   if(args.pLine3X) cS.pLine3X = args.pLine3X
   if(args.pLine3Y) cS.pLine3X = args.pLine3Y
   if(args.pLine3Z) cS.pLine3X = args.pLine3Z
   if(args.pLine4X) cS.pLine4X = args.pLine4X
   if(args.pLine4Y) cS.pLine4X = args.pLine4Y
   if(args.pLine4Z) cS.pLine4X = args.pLine4Z
   if(args.pLine5X) cS.pLine5X = args.pLine5X
   if(args.pLine5Y) cS.pLine5X = args.pLine5Y
   if(args.pLine5Z) cS.pLine5X = args.pLine5Z
   if(args.pLine6X) cS.pLine6X = args.pLine6X
   if(args.pLine6Y) cS.pLine6X = args.pLine6Y
   if(args.pLine6Z) cS.pLine6X = args.pLine6Z
   if(args.pLine7X) cS.pLine7X = args.pLine7X
   if(args.pLine7Y) cS.pLine7X = args.pLine7Y
   if(args.pLine7Z) cS.pLine7X = args.pLine7Z
   if(args.pLine8X) cS.pLine8X = args.pLine8X
   if(args.pLine8Y) cS.pLine8X = args.pLine8Y
   if(args.pLine8Z) cS.pLine8X = args.pLine8Z
   if(args.pLine9X) cS.pLine9X = args.pLine9X
   if(args.pLine9Y) cS.pLine9X = args.pLine9Y
   if(args.pLine9Z) cS.pLine9X = args.pLine9Z
   if(args.pLine10X) cS.pLine10X = args.pLine10X
   if(args.pLine10Y) cS.pLine10X = args.pLine10Y
   if(args.pLine10Z) cS.pLine10X = args.pLine10Z
   if(args.pLine11X) cS.pLine11X = args.pLine11X
   if(args.pLine11Y) cS.pLine11X = args.pLine11Y
   if(args.pLine11Z) cS.pLine11X = args.pLine11Z
   if(args.pLine12X) cS.pLine12X = args.pLine12X
   if(args.pLine12Y) cS.pLine12X = args.pLine12Y
   if (args.pLine12Z) cS.pLine12X = args.pLine12Z
   
   try {
      await cS.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return cS
   //This function updates the selected companySector
}