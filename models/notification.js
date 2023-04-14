import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idNotification: {
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
   showNotificationsToLevel: {
      type: Number,
      required: true   
   },
   dateStamp: {
      type: Date,
      required: true,
      minLength:3
   },
   notificationLevel: {
      type: Number,
      required: true   
   },
   notificationTitle: {
      type: String,
      required: true,
      minLength: 5,    
   },
   notificationDescription: {
      type: String,
      required: true,
      minLength: 5,    
   },
   isActive: {
      type: Boolean,
      required: true      
   }
})

schema.plugin(uniqueValidator)

export const notification = mongoose.model('notification', schema) 

//definitions (type)
export const gqlNotification = `
type notification {
   idNotification:ID!
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
   showNotificationsToLevel:Int!
   dateStamp:String!
   notificationLevel:Int!
   notificationTitle:String!
   notificationDescription:String!
   isActive:Boolean!
}

`

//definitions (query)
export const gqlQNotification = `
notificationByIdUser(idUser:ID!):[notification]!
notificationsToLevel(idUser:ID!,showNotificationsToLevel:Int!):[notification]!

`

//definitions (mutation)
export const gqlMNotification = `
addNewNotification(
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
   showNotificationsToLevel:Int!
   dateStamp:String!
   notificationLevel:Int!
   notificationTitle:String!
   notificationDescription:String!
   isActive:Boolean!
): notification
editNotification(
   idNotification:ID!
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
   showNotificationsToLevel:Int
   dateStamp:String
   notificationLevel:Int
   notificationTitle:String
   notificationDescription:String
   isActive:Boolean
): notification

`

//resolvers (query)
export const notificationByIdUser = async (root, args) => {   
   return await notification.filter({ idUser: args.idUser }) 
    //returns the total user's notification list
}
export const notificationsToLevel = async (root, args) => {    
   const { showNotificationsToLevel } = args.showNotificationsToLevel
   //no se si funcione el <= en mongo... si no funciona hay que armar alguna solución con un if y un for
   return await notification.find({ idUser: args.idUser, showNotificationsToLevel: `<=${showNotificationsToLevel}` })
   //should returns the total user's notification from the riskest level (1), to the specified level
}


//resolvers (mutation)
export const addNewNotification = async (root, args) => {
   const nN = new notification({ ...args, idNotification: uuid() })
   try {
      await nN.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nN
}
export const editNotification = async (root, args) => {
   
   const notif = await notification.findOne({ idNotification: args.idNotification })
   if (!notif) return

   if (args.idUser) notif.idUser = args.idUser
   if (args.idEmployee) notif.idEmployee = args.idEmployee
   if (args.firstName) notif.firstName = args.firstName
   if (args.secondName) notif.secondName = args.secondName
   if (args.lastName) notif.lastName = args.lastName
   if (args.secondLastName) notif.secondLastName = args.secondLastName
   if (args.nickName) notif.nickName = args.nickName
   if (args.email) notif.email = args.email
   if (args.phone) notif.phone = args.phone
   if (args.companyName) notif.companyName = args.companyName
   if (args.idCompanyBusinessUnit) notif.idCompanyBusinessUnit = args.idCompanyBusinessUnit
   if (args.companyBusinessUnitDescription) notif.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   if (args.idCompanySector) notif.idCompanySector = args.idCompanySector
   if (args.companySectorDescription) notif.companySectorDescription = args.companySectorDescription
   if (args.idcompanyJobRole) notif.idcompanyJobRole = args.idcompanyJobRole
   if (args.companyJobRoleDescription) notif.companyJobRoleDescription = args.companyJobRoleDescription
   if (args.showNotificationsToLevel) notif.showNotificationsToLevel = args.showNotificationsToLevel
   if (args.dateStamp) notif.dateStamp = args.dateStamp
   if (args.notificationLevel) notif.notificationLevel = args.notificationLevel
   if (args.notificationTitle) notif.notificationTitle = args.notificationTitle
   if (args.notificationDescription) notif.notificationDescription = args.notificationDescription
   if (args.isActive) notif.isActive = args.isActive

   try {
      await notif.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return notif
}