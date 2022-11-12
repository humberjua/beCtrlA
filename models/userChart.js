import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"


const schema = new mongoose.Schema({
   idUserChart: {
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
   idChart: {
      type: String,
      required: true,
      minLength:8      
   },
   chartDescription: {
      type: String,
      required: true,
      minLength:3
   },
   userChartDescription: {
      type: String,
      required: true,
      minLength:3
   },
   showingOrder: {
      type: Number,
      required: true
   },
   FromDay: {
      type: Date,
      required: true,
      minLength:3
   },
   toDay: {
      type: Date,
      required: true
   },
   x1: {
      type: String,
      required: true,
      minLength:3
   },
   x2: {
      type: String,
      required: false,
      minLength:3
   },
   x3: {
      type: String,
      required: false,
      minLength:3
   },
   x4: {
      type: String,
      required: false,
      minLength:3
   },
   y1DataField: {
      type: String,
      required: true,
      minLength:3
   },
   y1DataGroupingWay: {
      type: String,
      required: true,
      minLength:3
   },
   y1Value: {
      type: String,
      required: true,
      minLength:3
   },
   y2DataField: {
      type: String,
      required: false,
      minLength:3
   },
   y2DataGroupingWay: {
      type: String,
      required: true,
      minLength:3
   },
   y2Value: {
      type: String,
      required: false,
      minLength:3
   },
   y3DataField: {
      type: String,
      required: false,
      minLength:3
   },
   y3DataGroupingWay: {
      type: String,
      required: true,
      minLength:3
   },
   y3Value: {
      type: String,
      required: false,
      minLength:3
   },
   y4DataField: {
      type: String,
      required: false,
      minLength:3
   },
   y4DataGroupingWay: {
      type: String,
      required: true,
      minLength:3
   },
   y4Value: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelX1: {
      type: Boolean,
      required: true
   },
   labelX1: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelX2: {
      type: Boolean,
      required: true
   },
   labelX2: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelX3: {
      type: Boolean,
      required: true
   },
   labelX3: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelX4: {
      type: Boolean,
      required: true
   },
   labelX4: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelY1: {
      type: Boolean,
      required: true
   },
   labelY1: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelY2: {
      type: Boolean,
      required: true
   },
   labelY2: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelY3: {
      type: Boolean,
      required: true
   },
   labelY3: {
      type: String,
      required: false,
      minLength:3
   },
   showLabelY4: {
      type: Boolean,
      required: true
   },
   labelY4: {
      type: String,
      required: false,
      minLength:3
   },
   showTitle: {
      type: Boolean,
      required: true
   },
   title: {
      type: String,
      required: false,
      minLength:3
   }
})

schema.plugin(uniqueValidator)

export const userChart = mongoose.model('userChart', schema) 


//definitions (type)
export const gqlUserChart = `
type userChart {
   idUserChart:ID!
   idUser:ID!
   idChart:ID!
   chartDescription:String!
   userChartDescription:String
   showingOrder:Int!
   fromDay:String!
   toDay:String!
   x1:String!
   x2:String!
   x3:String!
   x4:String!
   y1DataField:String
   y1DataGroupingWay:String!
   y1Value:String
   y2DataField:String
   y2DataGroupingWay:String!
   y2Value:String
   y3DataField:String
   y3DataGroupingWay:String!
   y3Value:String
   y4DataField:String
   y4DataGroupingWay:String!
   y4Value:String
   showLabelX1:Boolean!
   labelX1:String
   showLabelX2:Boolean!
   labelX2:String
   showLabelX3:Boolean!
   labelX3:String
   showLabelX4:Boolean!
   labelX4:String
   showLabelY1:Boolean!
   labelY1:String
   showLabelY2:Boolean!
   labelY2:String
   showLabelY3:Boolean!
   labelY3:String
   showLabelY4:Boolean!
   labelY4:String
   showTitle:Boolean!
   title:String!
}

`

//definitions (query)
export const gqlQUserChart = `
userChartByIdUser(idUser:String!):[userChart]!

`

//definitions (mutation)
export const gqlMUserChart = `
addNewUserChart(
   idUser:ID!
   idChart:ID!
   chartDescription:String!
   userChartDescription:String!
   showingOrder:Int!
   FromDay:String!
   toDay:String!
   x1:String!
   x2:String!
   x3:String!
   x4:String!
   y1DataField:String!
   y1DataGroupingWay:String!
   y1Value:String!
   y2DataField:String!
   y2DataGroupingWay:String!
   y2Value:String!
   y3DataField:String!
   y3DataGroupingWay:String!
   y3Value:String!
   y4DataField:String!
   y4DataGroupingWay:String!
   y4Value:String!
   showLabelX1:Boolean!
   labelX1:String!
   showLabelX2:Boolean!
   labelX2:String!
   showLabelX3:Boolean!
   labelX3:String!
   showLabelX4:Boolean!
   labelX4:String!
   showLabelY1:Boolean!
   labelY1:String!
   showLabelY2:Boolean!
   labelY2:String!
   showLabelY3:Boolean!
   labelY3:String!
   showLabelY4:Boolean!
   labelY4:String!
   showTitle:Boolean!
   title:String!
): userChart
editUserChart(
   idUserChart:ID!
   idUser:ID
   idChart:ID
   chartDescription:String
   userChartDescription:String
   showingOrder:Int
   FromDay:String
   toDay:String
   x1:String
   x2:String
   x3:String
   x4:String
   y1DataField:String
   y1DataGroupingWay:String
   y1Value:String
   y2DataField:String
   y2DataGroupingWay:String
   y2Value:String
   y3DataField:String
   y3DataGroupingWay:String
   y3Value:String
   y4DataField:String
   y4DataGroupingWay:String
   y4Value:String
   showLabelX1:Boolean
   labelX1:String
   showLabelX2:Boolean
   labelX2:String
   showLabelX3:Boolean
   labelX3:String
   showLabelX4:Boolean
   labelX4:String
   showLabelY1:Boolean
   labelY1:String
   showLabelY2:Boolean
   labelY2:String
   showLabelY3:Boolean
   labelY3:String
   showLabelY4:Boolean
   labelY4:String
   showTitle:Boolean
   title:String
): userChart

`

//resolvers (query)
export const userChartByIdUser= async (root, args) => {   
   return await userChart.filter({idUser:args.idUser})   //returns the user's lists of charts (those of his/her preference)
}


//resolvers (mutation)
export const addNewUserChart = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
         
   const nUCh = new userChart({ ...args, idUserChart: uuid() })
   try {
      await nUCh.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nUCh
   //adds one new userChart record into Ctrl+A data base
}
export const editUserChart = async (root, args, { currentUser }) => {
   if (!currentUser) throw new AuthenticationError('Authentication failed...')
   
   const uCh = await userChart.findOne({ idUserChart: args.idUserChart })
   if (!uCh) return

   if (args.idUser) uCh.idUser = args.idUser
   if (args.idChart) uCh.idChart = args.idChart
   if (args.chartDescription) uCh.chartDescription = args.chartDescription
   if (args.userChartDescription) uCh.userChartDescription = args.userChartDescription
   if (args.showingOrder) uCh.showingOrder = args.showingOrder
   if (args.FromDay) uCh.FromDay = args.FromDay
   if (args.toDay) uCh.toDay = args.toDay
   if (args.x1) uCh.x1 = args.x1
   if (args.x2) uCh.x2 = args.x2
   if (args.x3) uCh.x3 = args.x3
   if (args.x4) uCh.x4 = args.x4
   if (args.y1DataField) uCh.y1DataField = args.y1DataField
   if (args.y1DataGroupingWay) uCh.y1DataGroupingWay = args.y1DataGroupingWay
   if (args.y1Value) uCh.y1Value = args.y1Value
   if (args.y2DataField) uCh.y2DataField = args.y2DataField
   if (args.y2DataGroupingWay) uCh.y2DataGroupingWay = args.y2DataGroupingWay
   if (args.y2Value) uCh.y2Value = args.y2Value
   if (args.y3DataField) uCh.y3DataField = args.y3DataField
   if (args.y3DataGroupingWay) uCh.y3DataGroupingWay = args.y3DataGroupingWay
   if (args.y3Value) uCh.y3Value = args.y3Value
   if (args.y4DataField) uCh.y4DataField = args.y4DataField
   if (args.y4DataGroupingWay) uCh.y4DataGroupingWay = args.y4DataGroupingWay
   if (args.y4Value) uCh.y4Value = args.y4Value
   if (args.showLabelX1) uCh.showLabelX1 = args.showLabelX1
   if (args.labelX1) uCh.labelX1 = args.labelX1
   if (args.showLabelX2) uCh.showLabelX2 = args.showLabelX2
   if (args.labelX2) uCh.labelX2 = args.labelX2
   if (args.showLabelX3) uCh.showLabelX3 = args.showLabelX3
   if (args.labelX3) uCh.labelX3 = args.labelX3
   if (args.showLabelX4) uCh.showLabelX4 = args.showLabelX4
   if (args.labelX4) uCh.labelX4 = args.labelX4
   if (args.showLabelY1) uCh.showLabelY1 = args.showLabelY1
   if (args.labelY1) uCh.labelY1 = args.labelY1
   if (args.showLabelY2) uCh.showLabelY2 = args.showLabelY2
   if (args.labelY2) uCh.labelY2 = args.labelY2
   if (args.showLabelY3) uCh.showLabelY3 = args.showLabelY3
   if (args.labelY3) uCh.labelY3 = args.labelY3
   if (args.showLabelY4) uCh.showLabelY4 = args.showLabelY4
   if (args.labelY4) uCh.labelY4 = args.labelY4
   if (args.showTitle) uCh.showTitle = args.showTitle
   if (args.title) uCh.title = args.title
   
   try {
      await uCh.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return uCh         
   // updates the selected userChart record selected
}