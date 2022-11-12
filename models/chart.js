import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { v1 as uuid } from 'uuid'
import { UserInputError } from "apollo-server"

//The "chart" collection has the different types of charts used by Ctrl+A


const schema = new mongoose.Schema({
   idChart: {
      type: String,
      unique: true,
      required: true,
      minLength:8      
   },
   chartDescription: {
      type: String,
      required: true,
      minLength:3
   },
   chartWidth: {
      type: Number,
      required: true
   },
   chartHeight: {
      type: Number,
      required: true
   },
   isAndroidChart: {
      type: Boolean,
      required: true
   },
   isIOSChart: {
      type: Boolean,
      required: true
   },
   isWebChart: {
      type: Boolean,
      required: true
   },
   maxNumberSeries: {
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

export const chart = mongoose.model('chart', schema) 


//definitions (type)
export const gqlChart = `
type chart {
   idChart:ID!
   chartDescription:String!
   chartWidth:Int!
   chartHeight:Int!
   isAndroidChart:Boolean!
   isIOSChart:Boolean!
   isWebChart:Boolean!
   maxNumberSeries:Int!
   FromDay:String!
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
   title:String
}

`

//definitions (query)
export const gqlQChart = `
chartsCount:Int!
allCharts:[chart]!

`

//definitions (mutations)
export const gqlMChart = `
addNewChart(
   chartDescription:String!
   chartWidth:Int!
   chartHeight:Int!
   isAndroidChart:Boolean!
   isIOSChart:Boolean!
   isWebChart:Boolean!
   maxNumberSeries:Int!
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
): chart
editChart(
   idChart:ID!
   chartDescription:String
   chartWidth:Int
   chartHeight:Int
   isAndroidChart:Boolean
   isIOSChart:Boolean
   isWebChart:Boolean
   maxNumberSeries:Int
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
): chart

`

//resolvers (query)
export const chartsCount = async () => await chart.collection.countDocuments()
//returns the amount of charts suported and actually loaded in CTRL+A
export const allCharts = async () => await chart.find({})
//returns the complete list of charts suported and actually loaded in CTRL+A


//resolvers ()
export const addNewChart = async (root, args) => {
   const nCh = new chart({ ...args, idChart: uuid() })
   try {
      await nCh.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return nCh
   //adds one new chart into CTRL+A data base
}
export const editChart = async (root, args) => {
   
   const ch = await chart.findOne({ idChart: args.idChart })
   if (!ch) return

   if (args.chartDescription) ch.chartDescription = args.chartDescription
   if (args.chartWidth) ch.chartWidth = args.chartWidth
   if (args.chartHeight) ch.chartHeight = args.chartHeight
   if (args.isAndroidChart) ch.isAndroidChart = args.isAndroidChart
   if (args.isIOSChart) ch.isIOSChart = args.isIOSChart
   if (args.isWebChart) ch.isWebChart = args.isWebChart
   if (args.maxNumberSeries) ch.maxNumberSeries = args.maxNumberSeries
   if (args.FromDay) ch.FromDay = args.FromDay
   if (args.toDay) ch.toDay = args.toDay
   if (args.x1) ch.x1 = args.x1
   if (args.x2) ch.x2 = args.x2
   if (args.x3) ch.x3 = args.x3
   if (args.x4) ch.x4 = args.x4
   if (args.y1DataField) ch.y1DataField = args.y1DataField
   if (args.y1DataGroupingWay) ch.y1DataGroupingWay = args.y1DataGroupingWay
   if (args.y1Value) ch.y1Value = args.y1Value
   if (args.y2DataField) ch.y2DataField = args.y2DataField
   if (args.y2DataGroupingWay) ch.y2DataGroupingWay = args.y2DataGroupingWay
   if (args.y2Value) ch.y2Value = args.y2Value
   if (args.y3DataField) ch.y3DataField = args.y3DataField
   if (args.y3DataGroupingWay) ch.y3DataGroupingWay = args.y3DataGroupingWay
   if (args.y3Value) ch.y3Value = args.y3Value
   if (args.y4DataField) ch.y4DataField = args.y4DataField
   if (args.y4DataGroupingWay) ch.y4DataGroupingWay = args.y4DataGroupingWay
   if (args.y4Value) ch.y4Value = args.y4Value
   if (args.showLabelX1) ch.showLabelX1 = args.showLabelX1
   if (args.labelX1) ch.labelX1 = args.labelX1
   if (args.showLabelX2) ch.showLabelX2 = args.showLabelX2
   if (args.labelX2) ch.labelX2 = args.labelX2
   if (args.showLabelX3) ch.showLabelX3 = args.showLabelX3
   if (args.labelX3) ch.labelX3 = args.labelX3
   if (args.showLabelX4) ch.showLabelX4 = args.showLabelX4
   if (args.labelX4) ch.labelX4 = args.labelX4
   if (args.showLabelY1) ch.showLabelY1 = args.showLabelY1
   if (args.labelY1) ch.labelY1 = args.labelY1
   if (args.showLabelY2) ch.showLabelY2 = args.showLabelY2
   if (args.labelY2) ch.labelY2 = args.labelY2
   if (args.showLabelY3) ch.showLabelY3 = args.showLabelY3
   if (args.labelY3) ch.labelY3 = args.labelY3
   if (args.showLabelY4) ch.showLabelY4 = args.showLabelY4
   if (args.labelY4) ch.labelY4 = args.labelY4
   if (args.showTitle) ch.showTitle = args.showTitle
   if (args.title) ch.title = args.title
   
   try {
      await ch.save()
   } catch (error) {
      throw new UserInputError(error.message, {
         invalidArgs: args
      })
   }
   return ch
   //updates the selected chart
}