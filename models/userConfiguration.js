import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idUserConfiguration: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   idUser: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   idEmployee: {
      type: String,
      required: true,
      minLength:8      
   },
   password: {
      type: String,
      required: true,
      minLength: 5,      
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
   idCompany: {
      type: String,
      required: true,
      minLength: 8,    
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
   idStandardJobRole: {
      type: String,
      required: true,
      minLength: 8,    
   },
   standardJobRoleDescription: {
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
   userProfileImage: {
      type: String,
      required: true,
      minLength: 8,    
   },
   theme: {
      type: String,
      required: true,
      minLength: 3,    
   },
   showNotificationsToLevel: {
      type: Number,
      required: true      
   },
   optionConfiguration1: {
      type: String,
      required: false,
      minLength: 3,    
   },
   optionConfiguration2: {
      type: String,
      required: false,
      minLength: 3,    
   },
   optionConfiguration3: {
      type: String,
      required: false,
      minLength: 3,    
   },   
   personalPhone: {
      type: String,
      required: false
   },
   personalEmail: {
      type: String,
      required: false
   },
   personalAddress: {
      type: String,
      required: false   
   },
   aboutMe: {
      type: String,
      required: false
   }
})

schema.plugin(uniqueValidator)

export const userConfiguration = mongoose.model('userConfiguration', schema) 


//definitions (type)
export const gqlUC = `
type userConfiguration {
   idUserConfiguration:ID!
   idUser:ID!
   idEmployee:ID!
   firstName:String!
   secondName:String
   lastName:String!
   secondLastName:String
   nickName:String!
   email:String!
   phone:String!
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   idCompanySector:ID!
   companySectorDescription:String!
   idcompanyJobRole:ID!
   companyJobRoleDescription:String!
   userProfileImage:String!
   theme:String!
   showNotificationsToLevel:Int
   optionConfiguration1:String
   optionConfiguration2:String
   optionConfiguration3:String
   personalPhone:String
   personalEmail:String
   personalAddress:String
   aboutMe:String
}

`

//definitions (query)
export const gqlQUC = `
userConfigurationFromCompany(companyName:String!):[userConfiguration]!
userConfigurationByIdEmployee(idEmployee:String!):userConfiguration!

`

//definitions (mutation)
export const gqlMUC = `
addNewUserConfiguration(
   idUser:ID!
   idEmployee:ID!         
   password:String!
   firstName:String!
   secondName:String
   lastName:String!
   secondLastName:String
   nickName:String!
   email:String!
   phone:String
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   idCompanySector:ID!
   companySectorDescription:String!
   idStandardJobRole:ID!
   standardJobRoleDescription:String!
   idcompanyJobRole:ID!
   companyJobRoleDescription:String!
   userProfileImage:String!
   theme:String!
   showNotificationsToLevel:Int!
   optionConfiguration1:String
   optionConfiguration2:String
   optionConfiguration3:String
   personalPhone:String
   personalEmail:String
   personalAddress:String
   aboutMe:String
): userConfiguration
editUserConfiguration(
   idUserConfiguration: ID!
   idUser:ID
   idEmployee:ID
   password:String
   firstName:String
   secondName:String
   lastName:String
   secondLastName:String
   nickName:String
   email:String
   phone:String
   idCompany:ID
   companyName:String
   idCompanyBusinessUnit:ID
   companyBusinessUnitDescription:String
   idCompanySector:ID
   companySectorDescription:String
   idStandardJobRole:ID
   standardJobRoleDescription:String
   idcompanyJobRole:ID
   companyJobRoleDescription:String
   userProfileImage:String
   theme:String
   showNotificationsToLevel:Int
   optionConfiguration1:String
   optionConfiguration2:String
   optionConfiguration3:String
   personalPhone:String
   personalEmail:String
   personalAddress:String
   aboutMe:String
): userConfiguration

`

//resolvers (query)
export const userConfigurationFromCompany = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   return await userConfiguration.find({ companyName: args.companyName })
   //returns all the users configurations from the specified company
}
export const userConfigurationByIdEmployee = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   return await userConfiguration.find({ idEmployee: args.idEmployee })
   //returns the user configuration from the specified user
}


//resolvers (mutation)
export const addNewUserConfiguration = async (root, args, { currentUser }) => {         
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const usrConf = new userConfiguration({ ...args, idUserConfiguration: uuid() })
   try {
      await usrConf.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args             
      })
   }
   return usrConf
   //adds one new userConfiguration's record. This function must be called with addNewUser
}
export const editUserConfiguration = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   
   const uC = await userConfiguration.findOne({ idUserConfiguration: args.idUserConfiguration })
   if (!uC) return

   if (args.idUser) uC.idUser = args.idUser
   if (args.idEmployee) uC.idEmployee = args.idEmployee
   if (args.password) uC.password = args.password
   if (args.firstName) uC.firstName = args.firstName
   if (args.secondName) uC.secondName = args.secondName
   if (args.lastName) uC.lastName = args.lastName
   if (args.secondLastName) uC.secondLastName = args.secondLastName
   if (args.nickName) uC.nickName = args.nickName
   if (args.email) uC.email = args.email
   if (args.phone) uC.phone = args.phone
   if (args.idCompany) uC.idCompany = args.idCompany
   if (args.companyName) uC.companyName = args.companyName
   if (args.idCompanyBusinessUnit) uC.idCompanyBusinessUnit = args.idCompanyBusinessUnit
   if (args.companyBusinessUnitDescription) uC.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   if (args.idCompanySector) uC.idCompanySector = args.idCompanySector
   if (args.companySectorDescription) uC.companySectorDescription = args.companySectorDescription
   if (args.idStandardJobRole) uC.idStandardJobRole = args.idStandardJobRole
   if (args.standardJobRoleDescription) uC.standardJobRoleDescription = args.standardJobRoleDescription
   if (args.idcompanyJobRole) uC.idcompanyJobRole = args.idcompanyJobRole
   if (args.companyJobRoleDescription) uC.companyJobRoleDescription = args.companyJobRoleDescription
   if (args.theme) uC.theme = args.theme
   if (args.userProfileImage) uC.userProfileImage = args.userProfileImage
   if (args.showNotificationsToLevel) uC.showNotificationsToLevel = args.showNotificationsToLevel
   if (args.optionConfiguration1) uC.optionConfiguration1 = args.optionConfiguration1
   if (args.optionConfiguration2) uC.optionConfiguration2 = args.optionConfiguration2
   if (args.optionConfiguration3) uC.optionConfiguration3 = args.optionConfiguration3
   if (args.personalPhone) uC.personalPhone = args.personalPhone
   if (args.personalEmail) uC.personalEmail = args.personalEmail
   if (args.personalAddress) uC.personalAddress = args.personalAddress
   if (args.aboutMe) uC.aboutMe = args.aboutMe
   
   try {
      await uC.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return uC
   //updates the UserConfiguration record selected with the passed values
}