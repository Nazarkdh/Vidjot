const mangoose=require('mongoose');
const Schema=mangoose.Schema

// create ideas schema

const IdeaSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  details:{
    type:String,
    required:true
  },
  user:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})

mangoose.model('ideas',IdeaSchema);