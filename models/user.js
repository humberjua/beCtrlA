import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import {v1 as uuid} from 'uuid'
import { AuthenticationError, UserInputError } from "apollo-server"
import bcrypt from 'bcrypt'


const schema = new mongoose.Schema({
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
      unique: true,
      required: true,
      minLength: 2,    
   },
   email: {
      type: String,
      unique: true,
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
   isCompanyAppAdmin: {
      type: Boolean,
      required: true,
      default: false,
      hide:true
   },
   hiredDate: {
      type: Date,
      required: true,      
   },
   active: {
      type: Boolean,
      required: false,
      default:true
   }
})

schema.plugin(uniqueValidator)

schema.set('toJSON', {
   transform: (document,returnedObject) => {
      returnedObject.id = returnedObject.idUser
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
   }
})


export const user = mongoose.model('user', schema) 


//definitions (type)
export const gqlUser = `
type user {
   idUser:ID!
   idEmployee:ID!
   password:String!
   firstName:String!
   secondName:String
   lastName:String!
   secondLastName:String
   nickName:String!
   email:String!
   phone:String!
   idCompany:ID!
   fullName:String
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
   isCompanyAppAdmin:Boolean!
   hiredDate:String!
   active:Boolean
}

`

//definitions (query)
export const gqlQUser = `
allUsers: Int!
allUsersFromCompany(companyName:String!): [user]!
me:user

`

//definitions (mutation)
export const gqlMUser = `
addNewUser(
   idEmployee: ID!
   password: String!
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
   isCompanyAppAdmin:Boolean!    
   hiredDate:String!
   active:Boolean     
): user
editUser(
   idUser:ID!
   password: String
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
   isCompanyAppAdmin:Boolean
   hiredDate:String
   active:Boolean
): user

`


//resolvers (query)
export const allUsers = () => user.collection.countDocuments()  //returns the user list loaded in Ctrl+A from all companies

export const allUsersFromCompany = async (root, args) => {
   return await user.find({ companyName: args.companyName })   //returns all users from the specified company   
}


//resolvers (mutation)
export const addNewUser = async (root, args, context) => {
   
   // const { currentUser } = context
   // if (!currentUser) throw new AuthenticationError('Authentication failed...')
   //this authentication must be used in all those queries and mutations that we consider as sensitive on security.

   // crypting password into mongo

   const saltRounds = 10         //constant used by bcrypt in order to enlarged or simplify the encryption method
                                 //bigger values will be more secure but it will take more process time, a common good value is 10
   const passwordHash = await bcrypt.hash(args.password, saltRounds)
   
   const nU = new user({ ...args, idUser: uuid(), password: passwordHash })

   try {
      await nU.save()
      //if new user has dependencies like "friends" for example, we need to add those friends to the currentUser as follows:
      //currentUser.friends = currentUser.friends.concat(nU)
      //await currentUser.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args               
      })
   }
   return nU
   //adds one new user to the CTRL+A database. After called this function, must be called the addNewUserConfiguration one
}
export const editUser = async (root, args, { currentUser }) => {   
   if (!currentUser) throw new AuthenticationError('Authentication failed...')

   const urs = await user.findOne({ idUser: args.idUser })
   
   if (!urs) return
      

   if (args.idEmployee) urs.idEmployee = args.idEmployee
   if (args.password) urs.password = args.password
   if (args.firstName) urs.firstName = args.firstName
   if (args.secondName) urs.secondName = args.secondName
   if (args.lastName) urs.lastName = args.lastName
   if (args.secondLastName) urs.secondLastName = args.secondLastName
   if (args.nickName) urs.nickName = args.nickName
   if (args.email) urs.email = args.email
   if (args.phone) urs.phone = args.phone
   if (args.idCompany) urs.idCompany = args.idCompany
   if (args.companyName) urs.companyName = args.companyName
   if (args.idCompanyBusinessUnit) urs.idCompanyBusinessUnit = args.idCompanyBusinessUnit
   if (args.companyBusinessUnitDescription) urs.companyBusinessUnitDescription = args.companyBusinessUnitDescription
   if (args.idCompanySector) urs.idCompanySector = args.idCompanySector
   if (args.companySectorDescription) urs.companySectorDescription = args.companySectorDescription
   if (args.idStandardJobRole) urs.idStandardJobRole = args.idStandardJobRole         
   if (args.standardJobRoleDescription) urs.standardJobRoleDescription = args.standardJobRoleDescription
   if (args.idcompanyJobRole) urs.idcompanyJobRole = args.idcompanyJobRole
   if (args.companyJobRoleDescription) urs.companyJobRoleDescription = args.companyJobRoleDescription
   if (args.userProfileImage) urs.userProfileImage = args.userProfileImage
   if (args.isCompanyAppAdmin) urs.isCompanyAppAdmin = args.isCompanyAppAdmin
   if (args.hiredDate) urs.hiredDate = args.hiredDate
   if (args.active) urs.active = args.active

   try {
      await urs.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return urs
   //updates the user data with the values passed
}