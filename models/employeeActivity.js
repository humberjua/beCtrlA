import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idEmployeeActivity: {
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
   yearUserTotalRelatedTicket: {
      type: Number,
      required: false  
   },
   monthUserTotalRelatedTicket: {
      type: Number,
      required: false  
   },
   qttyYearUserTotalRelatedTicket: {
      type: Number,
      required: false  
   },
   qttyMonthUserTotalRelatedTicket: {
      type: Number,
      required: false  
   },
   dateTimeEmployeeActivitySaved: {
      type: Date,
      required: false
   }
})

schema.plugin(uniqueValidator)

export const employeeActivity = mongoose.model('employeeActivity', schema) 


//definitions (type)
export const gqlEA = `
type employeeActivity {
   idEmployeeActivity:ID!
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
   yearUserTotalRelatedTicket:Int
   monthUserTotalRelatedTicket:Int
   qttyYearUserTotalRelatedTicket:Int
   qttyMonthUserTotalRelatedTicket:Int
   dateTimeEmployeeActivitySaved:String
}

`


//definitions (query)


//definitions (mutation)




//resolvers (query)


//resolvers (mutation)