const mongoose=require('mongoose');
const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
const User=mongoose.model('users');





  module.exports=function(passport){
    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
     User.findOne({email:email}).then(user=>{
      if(!user){
        return done(null,false,{message:'user not found'})
      }
     
      bcrypt.compare(password,user.password).then(isMatch=>{
        if(!isMatch){
          return done(null,false,{message:'username or password incorrect!'})
        }
        
       
        return done(null,user,{message:'Logged in successfully'})
      });



     })
    }))

    passport.serializeUser((user,done)=>{
     
      done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
     User.findById(id).then(user=>{
      if(!user){done(true,false)}
      done(null,user)
     })
    })

  };

