import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idEventConsequence: {
      type: String,
      unique: true,
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
      required: false,
      minLength:4  
   }      
})

schema.plugin(uniqueValidator)

export const eventConsequence = mongoose.model('eventConsequence', schema) 

//definitions (type)
export const gqlEC = `
type eventConsequence {
   idEventConsequence:ID!
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   eventConsequenceCustomDescription:String
}

`

//definitions (query)
export const gqlQEC = `
allEventConsequences:[eventConsequence]!
findEventConsequence(idEventConsequence:String!):eventConsequence

`

//definitions (mutation)
export const gqlMEC = `
addNewEventConsequence(
   eventConsequenceLevel:Int!
   eventConsequenceDescription:String!
   eventConsequenceCustomDescription:String!
): eventConsequence
editEventConsequence(
   idEventConsequence: ID!
   eventConsequenceLevel:Int
   eventConsequenceDescription:String
   eventConsequenceCustomDescription:String
): eventConsequence

`

//resolvers (query)
export const allEventConsequences = async () => await eventConsequence.find({})
//returns the eventConsequence collection complete

export const findEventConsequence = async (root, args, context) => {
   const { currentUser } = context
   if (!currentUser) throw new AuthenticationError('Authentication failed...')   
   const result = await eventConsequence.findOne({ idEventConsequence: args.idEventConsequence })
   return result
}



//resolvers (mutation)
export const addNewEventConsequence = async (root, args) => {
   const nEC = new eventConsequence({ ...args, idEventConsequence: uuid() })
   try {
      await nEC.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nEC
   //adds one new eventConsequence record to the collection
}
export const editEventConsequence = async (root, args) => {   
   const eC = await eventConsequence.findOne({ idEventConsequence: args.idEventConsequence })
   if (!eC) return

   if (args.eventConsequenceLevel) eC.eventConsequenceLevel = args.eventConsequenceLevel
   if (args.eventConsequenceDescription) eC.eventConsequenceDescription = args.eventConsequenceDescription
   if (args.eventConsequenceCustomDescription) eC.eventConsequenceCustomDescription = args.eventConsequenceCustomDescription
   
   try {
      await eC.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return eC
   //updates the eventConsequence record selected
}