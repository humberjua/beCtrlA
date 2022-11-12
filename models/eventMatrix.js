import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idEventMatrix: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   idEventProbability: {
      type: String,
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
   },
   idEventConsequence: {
      type: String,
      required: true,
      minLength:8      
   },
   eventConsequenceLevel: {
      type: Number,
      required: true
   },
   eventConsequenceDescription: {
      type: String,
      required: true,
      minLength:4
   },
   eventConsequenceCustomDescription: {
      type: String,
      required: true,
      minLength:4
   },
   eventMatrixLabel: {
      type: String,
      required: true,
      minLength:2
   },
   eventMatrixColor: {
      type: String,
      required: true,
      minLength:3
   }
})

schema.plugin(uniqueValidator)

export const eventMatrix = mongoose.model('eventMatrix', schema) 


//definitions (type)
export const gqlEM = `
type eventMatrix {
   idEventMatrix:ID!
   idEventProbability:ID!
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   eventProbabilityCustomDescription:String
   idEventConsequence:ID!
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   eventConsequenceCustomDescription:String
   eventMatrixLabel:String
   eventMatrixColor:String
}

`

//definitions (query)
export const gqlQEM = `
allEventMatrixValues:[eventMatrix]!
eventMatrixByConsequenceLevel(eventConsequenceLevel:Int!):[eventMatrix]!
eventMatrixByProbabilityLevel(eventProbabilityLevel:String!):[eventMatrix]!

`

//definitions (mutation)
export const gqlMEM = `
addNewEventMatrix(
   idEventProbability:ID!
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   eventProbabilityCustomDescription:String!
   idEventConsequence:ID!
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   eventConsequenceCustomDescription:String!
   eventMatrixLabel:String!
   eventMatrixColor:String!
): eventMatrix
editEventMatrix(
   idEventMatrix:ID!
   idEventProbability:ID
   eventProbabilityLevel:String
   eventProbabilityDescription:String
   eventProbabilityCustomDescription:String
   idEventConsequence:ID
   eventConsequenceLevel:Int
   eventConsequenceDescription:String
   eventConsequenceCustomDescription:String
   eventMatrixLabel:String
   eventMatrixColor:String
): eventMatrix

`

//resolvers (query)
export const allEventMatrixValues= async (root, args) => {
   return await eventMatrix.find({})
   //returns the eventMatrix complete collection
}
export const eventMatrixByConsequenceLevel = async (root, args) => {   
   return await eventMatrix.find({ eventConsequenceLevel: args.eventConsequenceLevel })
   //returns all the eventMatrix probabilities that match the consequence level you are looking for
}
export const eventMatrixByProbabilityLevel = async (root, args) => {   
   return await eventMatrix.find({ eventProbabilityLevel: args.eventProbabilityLevel })         
   //returns all the eventMatrix consequences that match the probability level you are looking for
}


//resolvers (mutation)
export const addNewEventMatrix = async (root, args) => {
   const nEM = new eventMatrix({ ...args, idEventMatrix: uuid() })
   try {
      await nEM.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nEM
   //adds one new eventMatrix into the collection         
}
export const editEventMatrix = async (root, args) => {
   
   const eM = await eventMatrix.findOne({ idEventMatrix: args.idEventMatrix })
   if (!eM) return

   if (args.idEventProbabilty) eM.idEventProbability = args.idEventProbability
   if (args.eventProbabilityLevel) eM.eventProbabilityLevel = args.eventProbabilityLevel
   if (args.eventProbabilityDescription) eM.eventProbabilityDescription = args.eventProbabilityDescription
   if (args.eventProbabilityCustomDescription) eM.eventProbabilityCustomDescription = args.eventProbabilityCustomDescription
   if (args.idEventConsequence) eM.idEventConsequence = args.idEventConsequence
   if (args.eventConsequenceLevel) eM.eventConsequenceLevel = args.eventConsequenceLevel
   if (args.eventConsequenceDescription) eM.eventConsequenceDescription = args.eventConsequenceDescription
   if (args.eventConsequenceCustomDescription) eM.eventConsequenceCustomDescription = args.eventConsequenceCustomDescription
   if (args.eventMatrixLabel) eM.eventMatrixLabel = args.eventMatrixLabel
   if (args.eventMatrixColor) eM.eventMatrixColor = args.eventMatrixColor
      
   try {
      await eM.save()
   }catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return eM
   //updates the eventMatrix record selected
}