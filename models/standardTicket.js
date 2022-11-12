import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import {v1 as uuid} from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idStandardTicket: {
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
      minLength: 1
   },
   eventProbabilityDescription: {
      type: String,
      required: true,
      minLength: 3
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
      minLength:3
   },
   standardTicketDescription: {
      type: String,
      required: true,
      minLength:8  
   },
   format1Image: {
      type: String,
      required: true,
      minLength:3  
   },
   format2Image: {
      type: String,
      required: false,
      minLength:3  
   },
   format3Image: {
      type: String,
      required: false,
      minLength:3  
   },
   format1Video: {
      type: String,
      required: true,
      minLength:3  
   },
   format2Video: {
      type: String,
      required: false,
      minLength:3  
   },
   format3Video: {
      type: String,
      required: false,
      minLength:3  
   },
   maxVideoDuration: {
      type: Number,
      required: true
   }
})

schema.plugin(uniqueValidator)

export const standardTicket = mongoose.model('standardTicket', schema) 

//definitions (type)
export const gqlST = `
type standardTicket {
   idStandardTicket:ID!
   idEventProbability:ID!
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   idEventConsequence:ID!
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   standardTicketDescription:String!
   format1Image:String!
   format2Image:String
   format3Image:String
   format1Video:String!
   format2Video:String
   format3Video:String
   maxVideoDuration:Int!
}

`

//definitions (query)
export const gqlQST = `
allStandardTickets:[standardTicket]!
standardTicketsCount:Int!

`

//definitions (mutation)
export const gqlMST = `
addNewStandardTicket(
   idEventProbability:ID!
   eventProbabilityLevel:String!
   eventProbabilityDescription:String!
   idEventConsequence:String!
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   standardTicketDescription:String!
   format1Image:String!
   format2Image:String!
   format3Image:String!
   format1Video:String!
   format2Video:String!
   format3Video:String!
   maxVideoDuration:Int!
): standardTicket
editStandardTicket(
   idStandardTicket: ID!
   idEventProbability:ID
   eventProbabilityLevel:String
   eventProbabilityDescription:String
   idEventConsequence:String
   eventConsequenceLevel:Int
   eventConsequenceDescription:String
   standardTicketDescription:String
   format1Image:String
   format2Image:String
   format3Image:String
   format1Video:String
   format2Video:String
   format3Video:String
   maxVideoDuration:Int
): standardTicket

`

//resolvers (query)
export const standardTicketsCount = () => standardTicket.collection.countDocuments()
//returns the amount of standard tickets already loaded into Ctrl+A database

export const allStandardTickets = async (root,args) => {
   return await standardTicket.find({})
   //returns the standardTicket collection complete
}



//resolvers (mutation)
export const addNewStandardTicket = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const nST = new standardTicket({ ...args, idStandardTicket: uuid() })
   try {
      await nST.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nST
   //adds one new standardTicket into the collection
}
export const editStandardTicket = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const sT = await standardTicket.findOne({ idStandardTicket: args.idStandardTicket })
   if (!sT) return

   if (args.idEventProbability) sT.idEventProbability = args.idEventProbability
   if (args.eventProbabilityLevel) sT.eventProbabilityLevel = args.eventProbabilityLevel
   if (args.eventProbabilityDescription) sT.eventProbabilityDescription = args.eventProbabilityDescription
   if (args.idEventConsequence) sT.idEventConsequence = args.idEventConsequence
   if (args.eventConsequenceLevel) sT.eventConsequenceLevel = args.eventConsequenceLevel
   if (args.eventConsequenceDescription) sT.eventConsequenceDescription = args.eventConsequenceDescription
   if (args.standardTicketDescription) sT.standardTicketDescription = args.standardTicketDescription
   if (args.format1Image) sT.format1Image = args.format1Image
   if (args.format2Image) sT.format2Image = args.format2Image
   if (args.format3Image) sT.format3Image = args.format3Image
   if (args.format1Video) sT.format1Video = args.format1Video
   if (args.format2Video) sT.format2Video = args.format2Video
   if (args.format3Video) sT.format3Video = args.format3Video
   if (args.maxVideoDuration) sT.maxVideoDuration = args.maxVideoDuration

   try {
      await sT.save()
   } catch (error) {
      new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return sT
   //updates the standardTicket selected
}