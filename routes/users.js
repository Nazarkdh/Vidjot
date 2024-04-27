const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const { default: mongoose } = require('mongoose');
const passport=require('passport')


// load User model
require('../models/User');
const User=mongoose.model('users')

// users login route
router.get('/login',(req,res)=>{
  res.render('./users/login')

})
// users register route
router.get('/register',(req,res)=>{
  res.render('./users/register')
});


// register user

router.post('/register',(req,res)=>{
  let errors=[];
  if(req.body.name==='' || req.body.email==='' || req.body.password===''|| req.body.password2==='')
  errors.push({text:'Please fill all fields!'});

  if(req.body.password.length<4)
  errors.push({text:'password must be at least 4 charactors'})

  if(req.body.password!==req.body.password2)
errors.push({text:'passwords don not match!'})

if(errors.length>0){
  console.log(errors)
  res.render('./users/register',{errors:errors,
  name:req.body.name,
  email:req.body.email,
  password:req.body.password,
  password2:req.body.password2
  })  
}else{

  User.findOne({email:req.body.email})
  .then((user)=>{
    if(user){
      req.flash('error_msg','User with this email already not registered!')
      res.redirect('/users/register')
      
    }else{
      const newUser=
      {name:req.body.name,
       email:req.body.email,
       password:req.body.password
      }

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err
          else
          newUser.password=hash;
    
          // now store user in DB
    
          new User(newUser).save()
          .then(()=>{
            req.flash('success_msg','User registered and can login')
            res.redirect('/users/login')
          }).catch(err=>{
            req.flash('error_msg','something went wrong!')
            return;
          })
        })
      })

    }
   
  })
}

});


// login user

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    failureRedirect:'/users/login',
    successRedirect:'/ideas',
    failureFlash:true
  })(req,res,next);
})

// logout user

router.get('/logout',(req,res)=>{
 
  req.logout((err)=>{
    if(err){
      req.flash('error_msg',"can't logout")
      return
    }
  })
  req.flash('success_msg','successed');

  
  res.redirect('/users/login');
 
  
})

module.exports=router;