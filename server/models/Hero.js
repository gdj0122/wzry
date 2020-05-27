const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
  name: { type:String },
  avatar: {type:String},
  banner:{type:String},
  title: {type:String},
  categories: [{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
  scors:{
    difficult: {type:Number},
    skill: {type:Number},
    attack: {type:Number},
    surviue: {type:Number}
  },
  skills:[{
    icon:{type:String},
    name:{type:String},
    description:{type:String},
    tips:{type:String},
    delay:{type:String},
    cost:{type:String},
  }],
  items1:[{
    type:mongoose.SchemaTypes.ObjectId, ref:"Item"
  }],
  items2:[{
    type:mongoose.SchemaTypes.ObjectId, ref:"Item"
  }],
  usageTips:{type:String},
  battleTips:{type:String},
  teamTips:{type:String},
  partners:[{
    hero:{type:mongoose.SchemaTypes.ObjectId,ref:"Hero"},
    description:{type:String}
  }],
})

module.exports = mongoose.model('Hero',scheam,'heroes')