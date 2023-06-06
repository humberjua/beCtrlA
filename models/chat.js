import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
   idChat: {
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
      required: true,
      minLength:8      
   },
   firstName: {
      type: String,
      required: true,
      minLength: 2,      
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
   idUserTo: {
      type: String,
      required: true,
      minLength:8      
   },
   userProfileImage: {
      type: String,
      required: true,
      minLength: 8,    
   },
   userProfileImageTo: {
      type: String,
      required: true,
      minLength: 8,    
   },
   chatText: {
      type: String,
      required: false,
      maxLength: 140,    
   },
   chatDateTimePost: {
      type: Date,
      required: false      
   },
   idConversation: {
      type: String,
      required: true,
      minLength:8
   }
})

schema.plugin(uniqueValidator)

export const chat = mongoose.model('chat', schema) 


//definitions (type)
export const gqlChat = `
type chat {
   idChat:ID!
   idUser:ID!
   idEmployee:ID!
   firstName:String!
   secondName:String
   lastName:String!
   secondLastName:String
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
   idUserTo:ID!
   userProfileImage:String
   userProfileImageTo:String
   chatText:String
   chatDateTimePost:String
   idConversation:ID!
}

`

//definitions (query)
export const gqlQChat = `
chatByIdUser(idUser:ID!):[chat]!
chatBy2Users(idUser:ID!,idUserTo:ID!):[chat]!
chatByConversation(idConversation:ID!):[chat]!
totalChatsByIdUser(idUser: ID!): Int!

`

//definitions (mutation)
export const gqlMChat = `
addNewChat(
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
   idUserTo:ID!
   userProfileImage:String!
   userProfileImageTo:String!
   chatText:String!
   chatDateTimePost:String!
   idConversation:ID!
): chat
editChat(
   idChat:ID!
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
   idUserTo:ID
   userProfileImage:String
   userProfileImageTo:String
   chatText:String
   chatDateTimePost:String
   idConversation:ID
): chat

`

//resolvers (query)
export const chatByIdUser = async (root, args) => {   
   return await chat.find({ idUser: args.idUser })
   //returns the complete chat of the specified user (idUser is unique by definition)
   //tipo de consulta solo válida para fines administrativos...         
}
export const chatBy2Users = async (root, args) => {   
   return await chat.find({ idUser: args.idUser, idUserTo: args.idUserTo }) //.sort({ chatDateTimePost })
   // antes decía .filter
   //returns all the chat between 2 users
   //tipo de consulta solo válida para fines administrativos...
}
export const chatByConversation= async (root, args) => {   
   return await chat.find({ idConversation: args.idConversation})
   //returns the chat by idConversation, one idConversation can include lots of idUser and allows the "add User" button
   //cada vez que se inicia un chat con una persona (chat que estaba vacío antes), se genera un nuevo idConversation
   //y por lo tanto las mismas se podràn consultar de esa forma
}

export const totalChatsByIdUser = async (root, args) => {
   return await chat.find({ idUser: args.idUser }).countDocuments()
}

//resolvers (mutation)
export const addNewChat = async (root, args) => {
   const nChat = new chat({ ...args, idChat: uuid() })

   try {
      await nChat.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nChat
   //adds one new record into the chat collection, this operation means one new idConversation. When some new user is added
   //to the conversation, it will have the same idConversation in order to showit later in the FE chat screen
}
export const editChat = async (root, args) => {
   
   const cht = await chat.findOne({ idChat: args.idChat })
   if (!cht) return cht

   if (args.idUser) cht.idUser = args.idUser
   if (args.idEmployee) cht.idEmployee = args.idEmployee
   if (args.firstName) cht.firstName = args.firstName
   if (args.secondName) cht.secondName = args.secondName
   if (args.lastName) cht.lastName = args.lastName
   if (args.secondLastName) cht.secondLastName = args.secondLastName
   if (args.nickName) cht.nickName = args.nickName
   if (args.email) cht.email = args.email
   if (args.phone) cht.phone = args.phone
   if (args.companyName) cht.companyName = args.companyName
   if (args.idCompanyBusinessUnit) cht.idCompanyBusinessUnit = args.idCompanyBusinessUnit
   if (args.companyBusinessUnitDescription) cht.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   if (args.idCompanySector) cht.idCompanySector = args.idCompanySector
   if (args.companySectorDescription) cht.companySectorDescription = args.companySectorDescription
   if (args.idcompanyJobRole) cht.idcompanyJobRole = args.idcompanyJobRole
   if (args.companyJobRoleDescription) cht.companyJobRoleDescription = args.companyJobRoleDescription
   if (args.idUserTo) cht.idUserTo = args.idUserTo
   if (args.userProfileImage) cht.userProfileImage = args.userProfileImage
   if (args.userProfileImageTo) cht.userProfileImageTo = args.userProfileImageTo
   if (args.chatText) cht.chatText = args.chatText
   if (args.chatDateTimePost) cht.chatDateTimePost = args.chatDateTimePost
   if (args.idConversation) cht.idConversation = args.idConversation

   try {
      await cht.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return cht
   //this function should change some aspect of the chat... if this may necesary...
}