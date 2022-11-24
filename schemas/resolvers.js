import {
   companyData, companyCount, allCompanies,
   findCompany, addNewCompany, editCompanyData
} from '../models/companyData.js'  

import {
   companyBusinessUnit, companyBusinessUnitCount,
   allBusinessUnits, businessUnitsFrom, addNewCompanyBusinessUnit, editCompanyBusinessUnitDescription
} from '../models/companyBusinessUnit.js'

import {
   standardSector, allStandardSectors,
   addNewStandardSector, editStandardSectorDescription
} from '../models/standardSector.js'  

import {
   companySector, allcompanySectors,
   addNewCompanySector, editCompanySector
} from '../models/companySector.js'  

import {
   standardJobRole, allStandardJobRoles,
   addNewStandardJobRole, editStandardJobRoleDescription
} from '../models/standardJobRole.js'  

import {
   companyJobRole, allCompanyJobRoles,
   addNewCompanyJobRole, editCompanyJobRoleDescription
} from '../models/companyJobRole.js'  

import {
   user, allUsers, allUsersFromCompany,
   addNewUser, editUser
} from '../models/user.js'  

import {
   userConfiguration, userConfigurationFromCompany,
   userConfigurationByIdEmployee, addNewUserConfiguration, editUserConfiguration
} from '../models/userConfiguration.js'  

import {
   riskQualification, allRiskQualifications,
   addNewRiskQualification, editRiskQualification
} from '../models/riskQualification.js'  

import {
   eventProbability, allEventProbabilities,
   addNewEventProbability, editEventProbability
} from '../models/eventProbability.js'  

import {
   eventConsequence, allEventConsequences,
   addNewEventConsequence, editEventConsequence
} from '../models/eventConsequence.js'  

import {
   eventMatrix, allEventMatrixValues, eventMatrixByConsequenceLevel,
   eventMatrixByProbabilityLevel, addNewEventMatrix, editEventMatrix
} from '../models/eventMatrix.js'  

import {
   standardTicket, standardTicketsCount,
   allStandardTickets, addNewStandardTicket, editStandardTicket
} from '../models/standardTicket.js'  

import {
   ticket, allOpenTickets, allClosedTickets,
   ticketsOpenCount, ticketsClosedCount, ticketsWithVideo, allOpenTicketsFrom, allClosedTicketsFrom, ticketsOpenCountFrom, ticketsClosedCountFrom, ticketsWithVideoFrom, addNewTicket, editTicket
} from '../models/ticket.js'  

import {
   chart, chartsCount,
   allCharts, addNewChart, editChart
} from '../models/chart.js'  

import {
   userChart, userChartByIdUser, addNewUserChart, editUserChart
} from '../models/userChart.js'  

import {
   chat, chatByIdUser,
   chatBy2Users, chatByConversation, addNewChat, editChat
} from '../models/chat.js'  

import {
   notification, notificationByIdUser, notificationsToLevel, addNewNotification, editNotification
} from '../models/notification.js'  

import { riskStatsFromCompany, gqlRSFC } from '../models/riskStatsFromCompany.js'  
import { employeeActivity, gqlEA } from '../models/employeeActivity.js'  

import '../config/s3.js'    //debería abrir la conexión con el servicio aws s3

import {
   gqlS3, singleUploadLocal, multipleUploadLocal,
   singleUploadS3, multipleUploadS3
} from '../models/gqlS3.js'

import { ApolloServer, AuthenticationError, gql, UserInputError } from "apollo-server"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

//import { use } from "bcrypt/promises.js"
//import { graphql } from "graphql"
//import { graphqlUploadExpress }  from 'graphql-upload'

import '../config/db.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
let PORT = process.env.PORT || 5000

const resolvers = {
   Query: {

      //companyData 
      companyCount,     //how many companies have Ctrl+A implemented
      allCompanies,     //wich companies have Ctrl+A implemented
      findCompany,      //returns the data of the company sought
      
      //companyBusinessUnit
      companyBusinessUnitCount,        // returns the amount of business units of the company sought
      allBusinessUnits,                //al business units from all companies... just for admin purposes
      businessUnitsFrom,               // returns the business units data of the company sought
      
      //StandardSector 
      allStandardSectors,              //returns the standard sector data

      //companySector
      allcompanySectors,               //returns all sectors from the company you are looking for
      
      //standardJobRole 
      allStandardJobRoles,             //returns all standard job roles loaded into CTRL+A mongoDB
      
      // companyJobRole 
      allCompanyJobRoles,              // returns all the job roles from the company you are looking for
      
      //user 
      allUsers,                        //returns the users list loaded in Ctrl+A from all companies
      allUsersFromCompany,             //returns all the users from the specified company
      me: (root, args, context) => {return context.currentUser},
      
      //userConfiguration 
      userConfigurationFromCompany,    //returns all the users configurations from the specified company
      userConfigurationByIdEmployee,   //returns the user configuration from the specified user
      
      //riskQualification 
      allRiskQualifications,           //returns the risk qualification's list complete
      
      //eventProbability 
      allEventProbabilities,           //returns the eventProbabilitie collection complete
      
      //eventConsequence 
      allEventConsequences,            //returns the eventConsequence collection complete
      
      //eventMatrix 
      allEventMatrixValues,            //returns the eventMatrix complete collection
      eventMatrixByConsequenceLevel,   //returns all the eventMatrix probabilities that match the consequence level searched
      eventMatrixByProbabilityLevel,   //returns all the eventMatrix consequences that match the probability level searched
      
      //standardTicket 
      standardTicketsCount,            //returns the amount of standard tickets already loaded into Ctrl+A database
      allStandardTickets,              //returns the standardTicket collection complete
      
      //ticket, general queries, just for "admin dev" use.  
      allOpenTickets,
      allClosedTickets,
      ticketsOpenCount,
      ticketsClosedCount,
      ticketsWithVideo,                //returns only those tickets loded with some video attached. from all companies
      
      //ticket, particular queries for "admin app" or final user.
      allOpenTicketsFrom,              //returns only those tickets opened from the specified company
      allClosedTicketsFrom,            //returns only those tickets closed from the specified company
      ticketsOpenCountFrom,            //returns the amount of opened tickets from the specified company
      ticketsClosedCountFrom,          //returns the amount of closed tickets from the specified company
      ticketsWithVideoFrom,            //this function should returns the total tickets uploaded for the specified company
                                       //or the tickets with some video loaded for the specified company.
         
      //chart 
      chartsCount,                     //returns the amount of charts suported and actually loaded in CTRL+A
      allCharts,                       //returns the complete list of charts suported and actually loaded in CTRL+A

      //userChart 
      userChartByIdUser,               //returns the user's lists of charts (those of his/her preference)
      
      //chat 
      chatByIdUser,                    //returns the complete chat of the specified user (idUser is unique by definition). Admin dev
      chatBy2Users,                    //returns all the chat between 2 users. Admin dev
      chatByConversation,              //returns the chat by idConversation, one idConversation can include lots of idUser 
                                       //and  allows the "add User" button functionality

      //notification 
      notificationByIdUser,            //returns the total user's notification list
      notificationsToLevel,            //returns the total user's notification list from the riskest level, to the specified level
      
      // Está faltando agregar las querys propias de las estadísticas (employeeActivity, riskStatsFromCompany),
      // esto tambièn implica agregarlas en la string function gql

      // A continucación debe ir la query del servicio AWS S3 (falta todavía)
      //uploadedFiles                  //Should returns the number of uploadedfiles

   },
   Mutation: {
      //companyData 
      addNewCompany,                                  //adds a new company in the companyData collection
      editCompanyData,                                //edits the companyData with only those parameters that was indicated

      //companyBusinessUnit   
      addNewCompanyBusinessUnit,                      //adds one new company's unit business          
      editCompanyBusinessUnitDescription,             //edits the description text of the company's unit business

      //standardSector
      addNewStandardSector,                           //adds one new standard sector to the collection
      editStandardSectorDescription,                  //updates the standard sector description text by id

      //companyJobRole
      addNewCompanyJobRole,                           //adds one new type company's jobe role
      editCompanyJobRoleDescription,                  //updates the description text of the company's job role

      //companySector
      addNewCompanySector,                            //adds one new company's work sector
      editCompanySector,                              //This function updates the selected companySector

      //standardJobRole
      addNewStandardJobRole,                          //adds one new Standard Job Role to the specific collection. Admin dev
      editStandardJobRoleDescription,                 //updates the selected standardJobRoleDescription

      //user
      addNewUser,                                //adds one new user. The addNewUserConfiguration function must be called after
      editUser,                                  //updates the user data selected with only the passed values

      //userConfiguration
      addNewUserConfiguration,                  //adds one new userConfiguration's record. This must be called with addNewUser
      editUserConfiguration,                    //updates the UserConfiguration record selected with the passed values

      //riskQualification
      addNewRiskQualification,                  //adds one new riskQualification record
      editRiskQualification,                    //updates the selected riskQualification record

      //eventProbability
      addNewEventProbability,                   //adds one new eventProbability record
      editEventProbability,                     //updates the selected eventProbability record 

      //eventConsequence
      addNewEventConsequence,                   //adds one new eventConsequence record to the collection
      editEventConsequence,                     //updates the eventConsequence record selected
      
      //eventMatrix
      addNewEventMatrix,                        //adds one new eventMatrix into the collection         
      editEventMatrix,                          //updates the eventMatrix record selected
      
      //standardTicket
      addNewStandardTicket,                     //adds one new standardTicket into the collection
      editStandardTicket,                       //updates the standardTicket selected
      
      //ticket
      addNewTicket,                             //adds one new ticket into the database.
      editTicket,                               // updates the selected ticket
      
      //chart
      addNewChart,                              //adds one new chart into CTRL+A data base
      editChart,                                //updates the selected chart
      
      //userChart
      addNewUserChart,                          //adds one new userChart record into Ctrl+A data base
      editUserChart,                            // updates the selected userChart record selected
      
      //chat
      addNewChat,                      //adds one new record into chat collection, this operation means one new idConversation.
      editChat,                        //this function should change some aspect of the chat... if this is necesary
      
      //notification
      addNewNotification,                       //adds one new notification
      editNotification,                         //edits one notification
      login: async (root, args) => {
         
         //se logueará por usuario (nickName) que es único. Al nuevo usuario lo creará el "adminApp" o el "adminDev"

         const usr = await user.findOne({ nickName: args.userName })
         
         if (!usr) throw new UserInputError('Wrong credentials')               

         const match = await bcrypt.compare(args.password, usr.password);
         if (!match) {
            throw new UserInputError('Wrong credentials')               
         }
        
         const userForToken = {
            username: usr.nickName,
            id: usr._id
         }
         return {
            value: jwt.sign(userForToken,JWT_SECRET)
         }
      },
      //En esta parte hay que analizar si conviene poner un logout o si eso lo hacemos desde el cliente

      

      // Está faltando agregar las mutations propias de las estadísticas (employeeActivity, riskStatsFromCompany)
      // esto tambièn implica agregarlas en la string function gql


      //A continuación las Mutations del AWS S3
      singleUploadLocal,                        //In order to upload one unique file to local storage (don't used at the moment)
      multipleUploadLocal,                      //To upload a group of files to local storage (don't used at the moment)
      singleUploadS3,                           //To upload a single file to AWS-S3 cloud storage
      multipleUploadS3                          //To upload a group of files to AWS-S3 cloud storage
   },
   companyData: {
       address: (root) => `${root.headQuartersCity}, ${root.headQuartersStreet} - ${root.headQuartersNumber}. ZIP CODE = ${root.headQuartersZipCode}`
   },   
   user: {
      fullName: (root) => `${root.lastName}${root.secondLastName===null?"":" " + root.secondLastName}, ${root.firstName}${root.secondName===null?"":" " + root.secondName}`
   }
}

export default resolvers