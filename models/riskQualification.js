import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idRiskQualification: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   riskQualificationLevel: {
      type: Number,
      required: true           
   },
   riskQualificationInitials: {
      type: String,
      required: true,
      minLength:2
   },
   riskQualificationDescription: {
      type: String,
      required: true,
      minLength:5
   }
})

schema.plugin(uniqueValidator)

export const riskQualification = mongoose.model('riskQualification', schema) 


//definitions (type)
export const gqlRQ = `
type riskQualification {
   idRiskQualification:ID!
   riskQualificationLevel:Int!
   riskQualificationInitials:String!
   riskQualificationDescription:String!
}

`


//definitions (query)
export const gqlQRQ = `
allRiskQualifications:[riskQualification]!

`


//definitions (mutation)
export const gqlMRQ = `
addNewRiskQualification(
   riskQualificationLevel:Int!
   riskQualificationInitials:String!
   riskQualificationDescription:String!
): riskQualification
editRiskQualification(
   idRiskQualification:ID!
   riskQualificationInitials:String
   riskQualificationDescription:String
): riskQualification

`


//resolvers (query)
export const allRiskQualifications = async () => await riskQualification.find({})
//returns the risk qualification's list complete

//resolvers (mutation)
export const addNewRiskQualification = async (root, args) => {
   const nRQ = new riskQualification({ ...args, idRiskQualification: uuid() })
   try {
      await nRQ.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nRQ
   //adds one new riskQualification record
}
export const editRiskQualification = async (root, args) => {
   
   const rQ = await riskQualification.findOne({ idRiskQualification: args.idRiskQualification })
   if (!rQ) return
   
   if (args.riskQualificationInitials) rQ.riskQualificationInitials = args.riskQualificationInitials
   if (args.riskQualificationDescription) rQ.riskQualificationDescription = args.riskQualificationDescription
   
   try {
      await rQ.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return rQ
   //updates the selected riskQualification record
}