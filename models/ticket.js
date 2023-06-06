import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idTicket: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   idUser: {
      type: String,
      required: true,
      minLength:8      
   },
   idEmployee: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   firstName: {
      type: String,
      required: true,
      minLength:2    
   },
   secondName: {
      type: String,
      required: false,
      minLength: 2,      
   },
   lastName: {
      type: String,
      required: true,
      minLength: 2,      
   },
   secondLastName: {
      type: String,
      required: false,
      minLength: 2,    
   },
   nickName: {
      type: String,
      required: true,
      minLength: 2,    
   },
   email: {
      type: String,
      required: true,
      minLength: 6,    
   },
   phone: {
      type: String,
      required: false,
      minLength: 6,    
   },
   companyName: {
      type: String,
      required: true,
      minLength: 3,    
   },
   idCompanyBusinessUnit: {
      type: String,
      required: true,
      minLength: 8,    
   },
   companyBusinessUnitDescription: {
      type: String,
      required: true,
      minLength: 5,    
   },
   idCompanySector: {
      type: String,
      required: true,
      minLength: 8,    
   },
   companySectorDescription: {
      type: String,
      required: true,
      minLength: 5,    
   },
   idcompanyJobRole: {
      type: String,
      required: true,
      minLength: 8,    
   },
   companyJobRoleDescription: {
      type: String,
      required: true,
      minLength: 5,    
   },
   idStandardTicket: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   eventProbabilityLevel: {
      type: String,
      required: true,
      minLength: 1
   },
   eventConsequenceLevel: {
      type: Number,
      required: true           
   },
   standardTicketDescription: {
      type: String,
      required: true,
      minLength:8  
   },
   idStandardJobRole: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   standardJobRoleDescription: {
      type: String,
      required: true,
      minLength:5      
   },
   ticketCustomDescription: {
      type: String,
      required: true,
      minLength:8  
   },
   dateTimeTicketPost: {
      type: Date,
      required: true      
   },
   dateTimeEvent: {
      type: Date,
      required: true      
   },
   monthEvent: {
      type: String,
      required: true,
      minLength:3
   },
   yearEvent: {
      type: String,
      required: true,
      minLength:4
   },
   ticketImage1: {
      type: String,
      required: false,
      minLength:4
   },
   ticketImage2: {
      type: String,
      required: false,
      minLength:4
   },
   ticketImage3: {
      type: String,
      required: false,
      minLength:4
   },
   ticketImage4: {
      type: String,
      required: false,
      minLength:4
   },
   ticketVideo: {
      type: String,
      required: false,
      minLength:4
   },
   ticketSolved: {
      type: Boolean,
      required: true
   },
   ticketLike: {
      type: Number,
      required: true
   },
   injuredPeople: {
      type: Number,
      required: true
   },
   lostProduction: {
      type: Number,
      required: true
   },
   lostProductionTotalTimeDuration: {
      type: Number,
      required: true
   },
   dateTimeEventResolved: {
      type: Date,
      required: true      
   },
   ticketClosed: {
      type: Boolean,
      required: true      
   },
   ticketExtraFile: {
      type: String,     //Averiguar para este caso que es lo que realmente conviene
      required:false
   }
})

schema.plugin(uniqueValidator)

export const ticket = mongoose.model('ticket', schema) 

//definitions (type)
export const gqlT = `
type ticket {
   idTicket:ID!
   idUser:ID!
   idEmployee:ID!
   firstName:String!
   secondName:String
   lastName:String!
   secondLastName:String
   nickName:String!
   email:String!
   phone:String
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String
   idCompanySector:ID!
   companySectorDescription:String!
   idcompanyJobRole:ID!
   companyJobRoleDescription:String!
   idStandardTicket:ID!
   eventProbabilityLevel:String!
   eventConsequenceLevel:Int!
   standardTicketDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   ticketCustomDescription:String!
   dateTimeTicketPost:String!
   dateTimeEvent:String!
   monthEvent:String!
   yearEvent:String!
   ticketImage1:String
   ticketImage2:String
   ticketImage3:String
   ticketImage4:String
   ticketVideo:String
   ticketSolved:Boolean!
   ticketLike:Int!
   injuredPeople:Int!
   lostProduction:Int!
   lostProductionTotalTimeDuration:Int!
   dateTimeEventResolved:String!
   ticketClosed:Boolean!
   ticketExtraFile:String
}

`

//definitions (query)
export const gqlQT = `
allOpenTickets:[ticket]!
allClosedTickets:[ticket]!
ticketsOpenCount:Int!    
ticketsClosedCount:Int!
ticketsWithVideo(ticketVideo: YesNo):[ticket]!
allOpenTicketsFrom(companyName:String!):[ticket]!
allClosedTicketsFrom(companyName:String!):[ticket]!
ticketsOpenCountFrom(companyName:String!):Int!
ticketsClosedCountFrom(companyName:String!):Int!
ticketsWithVideoFrom(companyName:String!, ticketVideo: YesNo):[ticket]!

`

//definitions (mutation)
export const gqlMT = `
addNewTicket(
   idUser:ID!
   idEmployee:ID!
   firstName:String!
   secondName:String!
   lastName:String!
   secondLastName:String!
   nickName:String!
   email:String!
   phone:String!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idCompanySector:ID!
   companySectorDescription:String!
   idcompanyJobRole:ID!
   companyJobRoleDescription:String!
   idStandardTicket:ID!
   eventProbabilityLevel:String!
   eventConsequenceLevel:Int!
   standardTicketDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   ticketCustomDescription:String!
   dateTimeTicketPost:String!
   dateTimeEvent:String!
   monthEvent:String!
   yearEvent:String!
   ticketImage1:String!
   ticketImage2:String!
   ticketImage3:String!
   ticketImage4:String!
   ticketVideo:String!
   ticketSolved:Boolean!
   ticketLike:Int!
   injuredPeople:Int!
   lostProduction:Int!
   lostProductionTotalTimeDuration:Int!
   dateTimeEventResolved:String!
   ticketClosed:Boolean!
   ticketExtraFile:String!
): ticket
editTicket(
   idTicket: ID!
   idUser:ID
   idEmployee:ID
   firstName:String
   secondName:String
   lastName:String
   secondLastName:String
   nickName:String
   email:String
   phone:String
   companyName:String
   idCompanyBusinessUnit:ID
   companyBusinessUnitDescription:String
   idCompanySector:ID
   companySectorDescription:String
   idcompanyJobRole:ID
   companyJobRoleDescription:String
   idStandardTicket:ID
   eventProbabilityLevel:String
   eventConsequenceLevel:Int
   standardTicketDescription:String
   idStandardJobRole:ID
   standardJobRoleDescription:String
   ticketCustomDescription:String
   dateTimeTicketPost:String
   dateTimeEvent:String
   monthEvent:String
   yearEvent:String
   ticketImage1:String
   ticketImage2:String
   ticketImage3:String
   ticketImage4:String
   ticketVideo:String
   ticketSolved:Boolean
   ticketLike:Int
   injuredPeople:Int
   lostProduction:Int
   lostProductionTotalTimeDuration:Int
   dateTimeEventResolved:String
   ticketClosed:Boolean
   ticketExtraFile:String
): ticket

`

//resolvers (query)
//ticket, en general, querys para admin app.  
export const allOpenTickets = async ({currentUser}) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')   

   await ticket.find({ ticketClosed: false })
}
export const allClosedTickets = async ({currentUser}) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')   

   await ticket.find({ ticketClosed: true })
}
export const ticketsOpenCount = async ({ currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   await ticket.find({ ticketClosed: false }).collection.countDocuments()
}
export const ticketsClosedCount = async ({currentUser}) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')   

   await ticket.find({ ticketClosed: true }).collection.countDocuments()
}
export const ticketsWithVideo = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   if (!args.ticketVideo) return ticket.find({})           
   return await ticket.find({ticketVideo:{$exists:args.ticketVideo==="YES"}})
   //should returns only those tickets that was loded with some video attached. from all companies
}


//ticket, en particular, querys para company admin || final user.
export const allOpenTicketsFrom = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   return await ticket.find({ ticketClosed: false, companyName: args.companyName })
   //returns only those tickets opened from the specified company
}
export const allClosedTicketsFrom = async (root, args, {currentUser}) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   return await ticket.find({ ticketClosed: true, companyName: args.companyName })
   //returns only those tickets closed from the specified company
}
export const ticketsOpenCountFrom = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   return await ticket.find({ ticketClosed: false, companyName: args.companyName }).collection.countDocuments()
   //returns the amount of opened tickets from the specified company
}
export const ticketsClosedCountFrom = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   return await ticket.find({ ticketClosed: true, companyName: args.companyName }).collection.countDocuments()
   //returns the amount of closed tickets from the specified company
}
export const ticketsWithVideoFrom = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   // esta función hay que revisarla bien, ya que agrega además la complejidad de los "Enums"
   if (!args.ticketVideo) return await ticket.find({ companyName: args.companyName })
   return await ticket.find({ticketVideo:{$exists:args.ticketVideo==="YES"}, companyName: args.companyName})
   //depending on the arguments this function should returns the total tickets uploaded for the specified company
   //or the tickets with some video loaded for the specified company, or without
}



//resolvers (mutation)
export const addNewTicket = async (root, args) => {
   const nT = new ticket({ ...args, idTicket: uuid() })
   try {
      await nT.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nT
   //adds one new ticket into the database. It counts with lots of information for the consequent statistic analysis
}
export const editTicket = async (root, args) => {
   
   const t = await ticket.findOne({ idTicket: args.idTicket })
   if (!t) return
   
   if (args.idUser) t.idUser = args.idUser
   if (args.idEmployee) t.idEmployee = args.idEmployee
   if (args.firstName) t.firstName = args.firstName
   if (args.secondName) t.secondName = args.secondName
   if (args.lastName) t.lastName = args.lastName
   if (args.secondLastName) t.secondLastName = args.secondLastName
   if (args.nickName) t.nickName = args.nickName
   if (args.email) t.email = args.email
   if (args.phone) t.phone = args.phone
   if (args.companyName) t.companyName = args.companyName
   if (args.idCompanyBusinessUnit) t.idCompanyBusinessUnit = args.idCompanyBusinessUnit
   if (args.companyBusinessUnitDescription) t.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   if (args.idCompanySector) t.idCompanySector = args.idCompanySector
   if (args.companySectorDescription) t.companySectorDescription = args.companySectorDescription
   if (args.idcompanyJobRole) t.idcompanyJobRole = args.idcompanyJobRole
   if (args.companyJobRoleDescription) t.companyJobRoleDescription = args.companyJobRoleDescription
   if (args.idStandardTicket) t.idStandardTicket = args.idStandardTicket
   if (args.eventProbabilityLevel) t.eventProbabilityLevel = args.eventProbabilityLevel
   if (args.eventConsequenceLevel) t.eventConsequenceLevel = args.eventConsequenceLevel
   if (args.standardTicketDescription) t.standardTicketDescription = args.standardTicketDescription
   if (args.idStandardJobRole) t.idStandardJobRole = args.idStandardJobRole
   if (args.standardJobRoleDescription) t.standardJobRoleDescription = args.standardJobRoleDescription
   if (args.ticketCustomDescription) t.ticketCustomDescription = args.ticketCustomDescription
   if (args.dateTimeTicketPost) t.dateTimeTicketPost = args.dateTimeTicketPost
   if (args.dateTimeEvent) t.dateTimeEvent = args.dateTimeEvent
   if (args.monthEvent) t.monthEvent = args.monthEvent
   if (args.yearEvent) t.yearEvent = args.yearEvent
   if (args.ticketImage1) t.ticketImage1 = args.ticketImage1
   if (args.ticketImage2) t.ticketImage2 = args.ticketImage2
   if (args.ticketImage3) t.ticketImage3 = args.ticketImage3
   if (args.ticketImage4) t.ticketImage4 = args.ticketImage4
   if (args.ticketVideo) t.ticketVideo = args.ticketVideo
   if (args.ticketSolved) t.ticketSolved = args.ticketSolved
   if (args.ticketLike) t.ticketLike = args.ticketLike
   if (args.injuredPeople) t.injuredPeople = args.injuredPeople
   if (args.lostProduction) t.lostProduction = args.lostProduction
   if (args.lostProductionTotalTimeDuration) t.lostProductionTotalTimeDuration = args.lostProductionTotalTimeDuration
   if (args.dateTimeEventResolved) t.dateTimeEventResolved = args.dateTimeEventResolved
   if (args.ticketClosed) t.ticketClosed = args.ticketClosed
   
   try {
      await t.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }

   return t
   // updates the selected ticket
}