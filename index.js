import { ApolloServer, AuthenticationError, gql, UserInputError } from "apollo-server"
import './config/db.js'
import jwt from 'jsonwebtoken'

import {
   user, gqlUser, gqlQUser, gqlMUser, allUsers, allUsersFromCompany,
   addNewUser, editUser
} from './models/user.js'  

import {
   userConfiguration, gqlUC, gqlQUC, gqlMUC, userConfigurationFromCompany,
   userConfigurationByIdEmployee, addNewUserConfiguration, editUserConfiguration
} from './models/userConfiguration.js'  

import './config/s3.js'    //debería abrir la conexión con el servicio aws s3

import {
   gqlS3, gqlQS3, gqlMS3, singleUploadLocal, multipleUploadLocal,
   singleUploadS3, multipleUploadS3
} from './models/gqlS3.js'

import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import typeDefs from './schemas/typeDefs.js'

import resolvers from './schemas/resolvers.js'

//import { use } from "bcrypt/promises.js"
//import { graphql } from "graphql"
//import { graphqlUploadExpress }  from 'graphql-upload'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
let PORT = process.env.PORT || 5000


//index.use(graphqlUploadExpress({maxFileSize:1000000000,maxFiles:10}))
const server = new ApolloServer({
   typeDefs,
   resolvers,
   // uploads:false,
   context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null      
      
      if (auth && auth.toLowerCase().startsWith("bearer ")) {         
         const token = auth.substring(7).toString()
         
         const {id} = jwt.verify(token, JWT_SECRET)
         const currentUser = await user.findById(id).exec()
         
         return {currentUser}
      }
   }   
})

//server.applyMiddleware()
server.listen(PORT).then(({ url }) => {
   console.log(`Server ready at ${url}`)
})