import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import {v1 as uuid} from 'uuid'
import { AuthenticationError, UserInputError } from "apollo-server"

const schema = new mongoose.Schema({
  idUserDevice: {
    type: String,
    unique: true,
    required: true,
    minLength: 8
  },
  idUser: {
    type: String,
    required: true,
    minLength:8
  },
  token: {
    type: String,
    required: true
  }
})

schema.plugin(uniqueValidator)

export const userDevices = mongoose.model('userDevices', schema)

// definitions (type)

export const gqlUD = `
type userDevices {
  idUserDevice:ID!
  idUser:ID!
  token:String!
}

`

//definitions (query)
export const gqlQUD = `
allDevicesFromUser(idUser:ID!):[userDevices]!

`

//definitions (mutations)
export const gqlMUD = `
addNewDeviceToUser: userDevices

`

//resolvers (query)
export const allDevicesFromUser = async (root,args) => {
  return await userDevices.find({idUser: args.idUser})
}

//resolvers (mutation)
export const addNewDeviceToUser = async (root, args) => {
  // Primero debo filtrar los "devices" del "user"
  // Si no existe, ==> lo agrego, y si no devuelvo null
  //nOD ==> Number of Devices from user. La cantidad de dispositivos que actualmente están cargados del usuario en la BD
  //nD2U ==> New Device to User, es la que agrega el nuevo dispositivo al usuario  
  if (args.userPlatform==='web') return
  const nOD = userDevices.find({idUser: args.idUser, token: args.token}).collection.countDocuments()
  if (nOD>0) return  
  // Recién acá se sabe que el usuario se está logueando desde un dispositivo nuevo (Android o IOS)
  // Y se intentará guardar el token de ese dispositivo en la BD. Ese token es único e irrepetible para c/dispositivo
  const nD2U = new userDevices({...args,idUserDevice: uuid()})
  try {
    await nD2U.save()
  } catch (error) {
    throw new UserInputError(error.messaage, {
      invalidArgs: args
    })
  }
}