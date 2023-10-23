import { ApolloServer } from "apollo-server"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import './config/db.js'

import { user } from './models/user.js'  
import './config/s3.js'    //debería abrir la conexión con el servicio aws s3

import typeDefs from './schemas/typeDefs.js'
import resolvers from './schemas/resolvers.js'

import { ApolloLogPlugin } from 'apollo-log'

/*
   Importante activar cuando se quiera enviar notificaciones
*/
// import './toClients/sendNotifications.js'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
let PORT = process.env.PORT || 5000

const plugins = [ApolloLogPlugin({})];
const server = new ApolloServer({
   typeDefs,
   resolvers,
   // plugins,
   // uploads:true,   
   context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null      
      if (auth && auth.toLowerCase().startsWith("bearer ")) {     
         
         // jwt.expiresIn = '1d'
         
         console.info('desde dentro del apollo server\n', auth)
         const token = auth.substring(7).toString()
         
         const {id} = jwt.verify(token, JWT_SECRET)
         const currentUser = await user.findById(id).exec()
         
         console.log('currentUser=\n', currentUser)
         return {currentUser}
      }
   }   
})

//server.applyMiddleware()
server.listen(PORT).then(({ url }) => {
   console.log(`Server ready at ${url}`)
})