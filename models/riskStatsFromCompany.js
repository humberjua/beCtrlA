import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idRiskStatsFromCompany: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   idCompanySector: {
      type: String,
      required: true,
      minLength: 8,    
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
   companySectorDescription: {
      type: String,
      required: true,
      minLength: 5,    
   },
   yearTotalRelatedTicket: {
      type: Number,
      required: false   
   },
   monthTotalRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyYearTotalRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyMonthTotalRelatedTicket: {
      type: Number,
      required: false   
   },
   yearInjuredPeopleRelatedTicket: {
      type: Number,
      required: false   
   },
   monthInjuredPeopleRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyYearInjuredPeopleRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyMonthInjuredPeopleRelatedTicket: {
      type: Number,
      required: false   
   },
   yearLostProductionRelatedTicket: {
      type: Number,
      required: false   
   },
   monthLostProductionRelatedTicket: {
      type: Number,
      required: false   
   },
   monthLostProductionRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyMonthLostProductionRelatedTicket: {
      type: Number,
      required: false   
   },
   yearInfrastuctureDamageRelatedTicket: {
      type: Number,
      required: false   
   },
   monthInfrastuctureDamageRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyYearInfrastuctureDamageRelatedTicket: {
      type: Number,
      required: false   
   },
   qttyMonthInfrastuctureDamageRelatedTicket: {
      type: Number,
      required: false   
   },
   dateTimeRiskStatsFromCompanySaved: {
      type: Date,
      required: false   
   }
})

schema.plugin(uniqueValidator)

export const riskStatsFromCompany = mongoose.model('riskStatsFromCompany', schema) 


//definitions (type)
export const gqlRSFC = `
type riskStatsFromCompany {
   idRiskStatsFromCompany:ID!
   idCompanySector:ID!
   idCompany:ID!
   companyName:String!
   idCompanyBusinessUnit:ID!
   companyBusinessUnitDescription:String!
   companySectorDescription:String!
   yearTotalRelatedTicket:Int
   monthTotalRelatedTicket:Int
   qttyYearTotalRelatedTicket:Int
   qttyMonthTotalRelatedTicket:Int
   yearInjuredPeopleRelatedTicket:Int
   monthInjuredPeopleRelatedTicket:Int
   qttyYearInjuredPeopleRelatedTicket:Int
   qttyMonthInjuredPeopleRelatedTicket:Int
   yearLostProductionRelatedTicket:Int
   monthLostProductionRelatedTicket:Int
   qttyYearLostProductionRelatedTicket:Int
   qttyMonthLostProductionRelatedTicket:Int
   yearInfrastuctureDamageRelatedTicket:Int
   monthInfrastuctureDamageRelatedTicket:Int
   qttyYearInfrastuctureDamageRelatedTicket:Int
   qttyMonthInfrastuctureDamageRelatedTicket:Int
   dateTimeRiskStatsFromCompanySaved:String
}

`


//definitions (query)

//definitions (mutation)



//resolvers (query)

//resolvers (mutation)