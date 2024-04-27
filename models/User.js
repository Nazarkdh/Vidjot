const mangoose=require('mongoose');
const Schema=mangoose.Schema;

const UserSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})

mangoose.model('users',UserSchema);