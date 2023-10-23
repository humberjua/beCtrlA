import { gqlCD, gqlQCD, gqlMCD } from '../models/companyData.js'  
import { gqlCBU, gqlQCBU, gqlMCBU } from '../models/companyBusinessUnit.js'
import { gqlSS, gqlQSS, gqlMSS } from '../models/standardSector.js'  
import { gqlCS, gqlQCS, gqlMCS } from '../models/companySector.js'  
import { gqlSJR, gqlQSJR, gqlMSJR } from '../models/standardJobRole.js'  
import { gqlCJR, gqlQCJR, gqlMCJR } from '../models/companyJobRole.js'  
import { gqlUser, gqlQUser, gqlMUser } from '../models/user.js'  
import { gqlUC, gqlQUC, gqlMUC } from '../models/userConfiguration.js'  
import { gqlRQ, gqlQRQ, gqlMRQ } from '../models/riskQualification.js'  
import { gqlEP, gqlQEP, gqlMEP } from '../models/eventProbability.js'  
import { gqlEC, gqlQEC, gqlMEC } from '../models/eventConsequence.js'  
import { gqlEM, gqlQEM, gqlMEM } from '../models/eventMatrix.js'  
import { gqlST, gqlQST, gqlMST } from '../models/standardTicket.js'  
import { gqlT, gqlQT, gqlMT } from '../models/ticket.js'  
import { gqlUD, gqlQUD, gqlMUD } from '../models/userDevices.js'
import { gqlChart, gqlQChart, gqlMChart } from '../models/chart.js'  
import { gqlUserChart, gqlQUserChart, gqlMUserChart } from '../models/userChart.js'  
import { gqlChat, gqlQChat, gqlMChat } from '../models/chat.js'  
import { gqlNotification, gqlQNotification, gqlMNotification } from '../models/notification.js'  
import { riskStatsFromCompany, gqlRSFC } from '../models/riskStatsFromCompany.js'  
import { employeeActivity, gqlEA } from '../models/employeeActivity.js'  
import { gqlS3, gqlQS3, gqlMS3 } from '../models/gqlS3.js'
import { gqlCC, gqlQCC, gqlMCC } from '../models/companyContract.js'
import {  gql } from "apollo-server"
import { GraphQLScalarType } from 'graphql'

const Upload = new GraphQLScalarType({ name: "Upload" });

const typeDefs = gql`
   
   scalar Upload 
   
   enum YesNo {
      YES
      NO
   }

   type Token {
      value: String!
   }

   ${gqlCD} ${gqlCBU} ${gqlSS} ${gqlCS} ${gqlSJR} ${gqlCJR} ${gqlUser} ${gqlUC} ${gqlRQ} ${gqlEP} ${gqlEC}
   ${gqlEM} ${gqlST} ${gqlT} ${gqlChart} ${gqlUserChart} ${gqlChat} ${gqlNotification} ${gqlRSFC} ${gqlEA}
   ${gqlS3} ${gqlUD} ${gqlCC}

   type Query {
      ${gqlQCD} ${gqlQCBU} ${gqlQSS} ${gqlQCS} ${gqlQSJR} ${gqlQCJR} ${gqlQUser} ${gqlQUC} ${gqlQRQ} ${gqlQEP}
      ${gqlQEC} ${gqlQEM} ${gqlQST} ${gqlQT} ${gqlQChart} ${gqlQUserChart} ${gqlQChat} ${gqlQNotification} 
      ${gqlQS3} ${gqlQUD} ${gqlQCC}
   }

   type Mutation {
      ${gqlMCD} ${gqlMCBU} ${gqlMCJR} ${gqlMSS} ${gqlMCS} ${gqlMSJR} ${gqlMUser} ${gqlMUC} ${gqlMRQ} ${gqlMEP} 
      ${gqlMEC} ${gqlMEM} ${gqlMST} ${gqlMT} ${gqlMChart} ${gqlMUserChart} ${gqlMChat} ${gqlMNotification} 
      ${gqlMS3} ${gqlMUD} ${gqlMCC}

      login(
         userName:String!
         password:String!
         userPlatform:String!
         tokenDevice:String
      ): Token
   }
`

// En el caso del login se piden 4 argumentos, de los cuales el usuario solamente escribe 2 
// (userName y password), los otros 2 los genera el sistema por el cual se esté logeando

export default typeDefs