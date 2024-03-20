import express from 'express'
import { ApolloServer } from "apollo-server-express"
// import { ApolloLogPlugin } from 'apollo-log'

import jwt from 'jsonwebtoken'
import { PORT, JWT_SECRET } from './config/calls.js'

import './config/db.js'

import { user } from './models/user.js'  
import './config/s3.js'    //conexión con el servicio aws s3

import typeDefs from './schemas/typeDefs.js'
import resolvers from './schemas/resolvers.js'

import { makeExecutableSchema } from '@graphql-tools/schema'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

/*
   Importante activar cuando se quiera enviar notificaciones
*/
// import './toClients/sendNotifications.js'


const app = express()

const schema = makeExecutableSchema({typeDefs, resolvers})

// const plugins = [ApolloLogPlugin({})];
const startApolloServer = async () => {
   const server = new ApolloServer({
      schema,
      csrfPrevention: false,  //Esto podría estar normalmente en true y ponerse en false a la hora de subir un archivo...            
      // plugins,   
      context: async ({ req }) => {
         // console.log(req)
         const auth = req ? req.headers.authorization : null      
         if (auth && auth.toLowerCase().startsWith("bearer ")) {     
            
            // jwt.expiresIn = '1d'
            
            // console.info('desde dentro del apollo server\n', auth)
            const token = auth.substring(7).toString()
            
            const {id} = jwt.verify(token, JWT_SECRET)
            const currentUser = await user.findById(id).exec()
            
            // console.log('currentUser=\n', currentUser)
            return {currentUser}
         }
      }   
   })

   app.use(graphqlUploadExpress({
      maxFileSize: 1000000000,
      maxFiles: 10
   }))

   await server.start()

   server.applyMiddleware({app, path: '/graphql'})
   
}

startApolloServer()

app.listen(PORT, () => {
   console.log(`server is running at http://localhost:${PORT}/graphql`)
})