const express=require('express');
const exphbs=require('express-handlebars');
const mangoose=require('mongoose');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path=require('path')
const app=express();
const session = require('express-session');
const flash=require('connect-flash');
const passport=require('passport')

//load routes
const ideas=require('./routes/ideas');
const users=require('./routes/users');

// load local strategy
require('./config/passport')(passport);
// load database config
const db=require("./config/database");

//connect mangodb
mangoose.connect(db.mongoURI)
.then(()=>console.log('mongodb connected successfully'))
.then(err=>{
  if(err)console.log(err)
});

// static folder
app.use(express.static(path.join(__dirname,'public')));

// Load idea model
require('./models/Idea')
const Idea=mangoose.model('ideas')

// handlebars middleware
app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// methodOverride middleware
app.use(methodOverride('_method'))

// express-session middleware
app.use(session({
  secret: 'secred',
  resave: false,
  saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash());


// set Global variables
app.use(function(req,res,next){

  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  if(req.user){
      res.locals.user={email:req.user.email.split('@')[0],password:req.user.password}
  }else{

    res.locals.user=null;
  }
  next()
})



const port=process.env.Port || 5000;

app.listen(port,()=>{
  console.log(`Server started on => localhost:${port}`)
})



// add / route
app.get('/',(req,res)=>{
 
  res.render('home',{firstName:'Nazar Mohammad', lastName:'Honeryar',
  title:'Welcome'})
  
 
})

// add About route
app.get('/about',(req,res)=>{
  // res.send("about")
  res.render('about',{firstName:'Nazar Mohammad', lastName:'Honeryar',
title:'Welcome'})
})

// use routes
app.use('/ideas',ideas)
app.use('/users',users)




// Deio9UqJDvJo3jHB
