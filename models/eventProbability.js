import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import {v1 as uuid} from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idEventProbability: {
      type: String,
      unique: true,
      required: true,
      minLength:8   
   },
   eventProbabilityLevel: {
      type: String,
      required: true,
      minLength:1
   },
   eventProbabilityDescription: {
      type: String,
      required: true,
      minLength:4
   },
   eventProbabilityCustomDescription: {
      type: String,
      required: true,
      minLength:4
   }
})

schema.plugin(uniqueValidator)

export const eventProbability = mongoose.model('eventProbability', schema) 

//definitions (type)
export const gqlEP = `
type eventProbability {
   idEventProbability:ID!
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   eventProbabilityCustomDescription:String
}

`

//definitions (query)
export const gqlQEP = `
allEventProbabilities:[eventProbability]!

`

//definitions (mutation)
export const gqlMEP = `
addNewEventProbability(
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   eventProbabilityCustomDescription:String!
): eventProbability
editEventProbability(
   idEventProbability:ID!
   eventProbabilityLevel:String
   eventProbabilityDescription:String
   eventProbabilityCustomDescription:String
): eventProbability

`

//resolvers (query)
export const allEventProbabilities = async () => await eventProbability.find({})
//returns the eventProbabilitie collection complete



//resolvers (mutation)
export const addNewEventProbability = async (root, args) => {
   const nEP = new eventProbability({ ...args, idEventProbability: uuid() })
   try {
      await nEP.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nEP
   //adds one new eventProbability record
}
export const editEventProbability = async (root, args) => {
   
   const eP = await eventProbability.findOne({ idEventProbability: args.idEventProbability })
   if (!eP) return
   
   if (args.eventProbabilityLevel) eP.eventProbabilityLevel = args.eventProbabilityLevel
   if (args.eventProbabilityDescription) eP.eventProbabilityDescription = args.eventProbabilityDescription
   if (args.eventProbabilityCustomDescription) eP.eventProbabilityCustomDescription = args.eventProbabilityCustomDescription

   try {
      await eP.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return eP
   //updates the selected eventProbability record with the new values passed
}