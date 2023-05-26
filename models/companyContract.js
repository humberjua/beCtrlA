import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { AuthenticationError, UserInputError } from "apollo-server"

// collection for the main data of the company, contact, address, phone, etc 
const schema = new mongoose.Schema({
   idCompany: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   companyName: {
      type: String,
      required: true,
      unique: true,
      minLength:3      
   },
   idContract: {
      type: String,
      unique: true,
      required: true,
      minLength:4
   },
   hasCAAdmin: {
    type: Boolean,
    required: true,
    default: false
   },
   amountOfCAA: {
    type: Number,
    default: 0,
    required: true
   },
   amountOfUsers: {
    type: Number,
    default: 50,
    required: true
   },
   amountOfChartsAllowed: {
    type: Number,
    default: 4,
    required: true
   }
})

schema.plugin(uniqueValidator)

export const companyContract = mongoose.model('companyContract', schema) 


//definitions (type)
export const gqlCC =`
type companyContract {
  idContract: ID!
  idCompany: ID!
  companyName: String!
  hasCAAdmin: Boolean!
  amountOfCAA: Int!
  amountOfUsers: Int!
  amountOfChartsAllowed: Int!
}

`

// *** la fila en blanco abajo del } es importante ***

//definitions (query)
export const gqlQCC =`
contractsCount: Int!
allContracts: [companyContract]!
findContract(companyName: String!): companyContract

`

//definitions (mutations)
export const gqlMCC =`
addNewCompanyContract(
  idCompany: ID! 
  companyName: String!
  hasCAAdmin: Boolean!
  amountOfCAA: Int!
  amountOfUsers: Int!
  amountOfChartsAllowed: Int!
): companyContract
editCompanyContract(
  idContract: ID
  idCompany: ID!
  companyName: String
  hasCAAdmin: Boolean
  amountOfCAA: Int
  amountOfUsers: Int
  amountOfChartsAllowed: Int
): companyContract

`

//resolvers (queries)
export const contractsCount = async () => await companyContract.collection.countDocuments()   //how many contracts have Ctrl+A implemented
export const allContracts = async () => {
   return await companyContract.find({})      //wich contracts have Ctrl+A
}
export const findContract = async (root, args) => {      
   return await companyContract.findOne({ companyName: args.companyName })   //returns the data of the company sought         
}


// resolvers (mutations)
export const addNewCompanyContract = async (root, args, { currentUser }) => {         
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
  // ojo que tal vez de error si no se verifica que el nombre de la empresa sea único
  const newCompanyContract = new companyContract({ ...args, idContract: uuid() })

  try {
     await newCompanyContract.save()
  } catch (error) {
     throw new UserInputError(error.message, {
        invalidArgs: args               
     })
  }
  return newCompanyContract 
  //adds a new company in the companyData collection
}
export const editCompanyContract = async (root, args, {currentUser}) => {
  if (!currentUser) throw new AuthenticationError('Authentication failed...')

  const contract = await companyContract.findOne({ idContract: args.idContract })
  if (!contract) return
  
  //hay que ir *** campo por campo ***, ver si puso o no puso el dato, si lo puso, guardar el nuevo y seguir         
  if (args.companyName) contract.companyName = args.companyName
  if (args.hasCAAdmin) contract.hasCAAdmin = args.hasCAAdmin
  if (args.amountOfCAA) contract.amountOfCAA = args.amountOfCAA
  if (args.amountOfUsers) contract.amountOfUsers = args.amountOfUsers
  if (args.amountOfChartsAllowed) contract.amountOfChartsAllowed = args.amountOfChartsAllowed
    
  try {
     await contract.save()
  } catch (error) {
     throw new UserInputError(error.message, {
        invalidArgs: args
     })
  }
  return contract
}
// edits the companyData with only those parameters indicated