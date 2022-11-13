import { companyData, gqlCD, gqlQCD, gqlMCD } from '../models/companyData.js'  
import { companyBusinessUnit, gqlCBU, gqlQCBU, gqlMCBU } from '../models/companyBusinessUnit.js'
import { standardSector, gqlSS, gqlQSS, gqlMSS } from '../models/standardSector.js'  
import { companySector, gqlCS, gqlQCS, gqlMCS } from '../models/companySector.js'  
import { standardJobRole, gqlSJR, gqlQSJR, gqlMSJR } from '../models/standardJobRole.js'  
import { companyJobRole, gqlCJR, gqlQCJR, gqlMCJR } from '../models/companyJobRole.js'  
import { user, gqlUser, gqlQUser, gqlMUser } from '../models/user.js'  
import { userConfiguration, gqlUC, gqlQUC, gqlMUC } from '../models/userConfiguration.js'  
import { riskQualification, gqlRQ, gqlQRQ, gqlMRQ } from '../models/riskQualification.js'  
import { eventProbability, gqlEP, gqlQEP, gqlMEP } from '../models/eventProbability.js'  
import { eventConsequence, gqlEC, gqlQEC, gqlMEC } from '../models/eventConsequence.js'  
import { eventMatrix, gqlEM, gqlQEM, gqlMEM } from '../models/eventMatrix.js'  
import { standardTicket, gqlST, gqlQST, gqlMST } from '../models/standardTicket.js'  
import { ticket, gqlT, gqlQT, gqlMT } from '../models/ticket.js'  
import { chart, gqlChart, gqlQChart, gqlMChart } from '../models/chart.js'  
import { userChart, gqlUserChart, gqlQUserChart, gqlMUserChart } from '../models/userChart.js'  
import { chat, gqlChat, gqlQChat, gqlMChat } from '../models/chat.js'  
import { notification, gqlNotification, gqlQNotification, gqlMNotification } from '../models/notification.js'  
import { riskStatsFromCompany, gqlRSFC } from '../models/riskStatsFromCompany.js'  
import { employeeActivity, gqlEA } from '../models/employeeActivity.js'  
import { gqlS3, gqlQS3, gqlMS3 } from '../models/gqlS3.js'
import {  gql } from "apollo-server"


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
   ${gqlS3}

   type Query {
      ${gqlQCD} ${gqlQCBU} ${gqlQSS} ${gqlQCS} ${gqlQSJR} ${gqlQCJR} ${gqlQUser} ${gqlQUC} ${gqlQRQ} ${gqlQEP}
      ${gqlQEC} ${gqlQEM} ${gqlQST} ${gqlQT} ${gqlQChart} ${gqlQUserChart} ${gqlQChat} ${gqlQNotification} 
      ${gqlQS3}
   }

   type Mutation {
      ${gqlMCD} ${gqlMCBU} ${gqlMCJR} ${gqlMSS} ${gqlMCS} ${gqlMSJR} ${gqlMUser} ${gqlMUC} ${gqlMRQ} ${gqlMEP} 
      ${gqlMEC} ${gqlMEM} ${gqlMST} ${gqlMT} ${gqlMChart} ${gqlMUserChart} ${gqlMChat} ${gqlMNotification} 
      ${gqlMS3}

      login(
         userName:String!
         password:String!
      ): Token
   }
`
export default typeDefs