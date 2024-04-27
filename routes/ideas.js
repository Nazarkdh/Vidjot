
const express=require('express');
const router=express.Router();
const mangoose=require('mongoose');

require('../models/Idea')
const Idea=mangoose.model("ideas")

const {ensureAuthenticated}=require('../helpers/auth')

// add idea route
router.get('/add',ensureAuthenticated,(req,res)=>{
  res.render('ideas/add')
 
})

// process add form data 
router.post('/',ensureAuthenticated,(req,res)=>{
  const errors=[]
  if(!req.body.title)
  errors.push({text:'please add a title!'})
  if(!req.body.details)
  errors.push({text:'please add some details!'})

  if(errors.length>0){
  req.flash('error_msg','error: '+errors)
  res.render('ideas/add',{
errors:errors,
title:req.body.title,
details:req.body.details
  })
}else{
  const newIdea={title:req.body.title,
                 details:req.body.details,
                 user:req.user.id
                }
  new Idea(newIdea).save()
  .then(idea=>{
    req.flash('success_msg','Idea added successfully')
    res.redirect('/ideas')
  })
}


})

// ideas route

router.get('/',ensureAuthenticated,(req,res)=>{
 Idea.find({user:req.user.id}).sort({date:'desc'})
 .then(ideas=>{
   const allIdeas=ideas.map(data=>{
    return {title:data.title,details:data.details, date:data.date, id:data.id}
   })
   res.render('ideas/index',{ideas:allIdeas}

  )

 }) 

})

// ideas edit form 

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
  Idea.findOne({_id:req.params.id})
  .then(idea=>{
    const myIdea={title:idea.title,details:idea.details,id:idea.id}
   
    res.render('ideas/edit',{idea:myIdea})
  })
})



// ideas edit form process 

router.put('/:id',ensureAuthenticated,(req,res)=>{
    Idea.findOne({_id:req.params.id})
    .then(idea=>{
      idea.title=req.body.title
      idea.details=req.body.details;
      idea.save()
      .then(idea=>{
        req.flash('success_msg','Idea edited successfully')
        res.redirect('/ideas')
      })
          
    })
})


// ideas delete process

router.delete('/:id',ensureAuthenticated,(req,res)=>{
   Idea.findByIdAndDelete({_id:req.params.id})
   .then(()=>{
     req.flash('success_msg','Idea removed successfully')
     res.redirect('/ideas')
   })

})


module.exports=router;