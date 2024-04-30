if(process.env.NODE_ENV=='production'){
  console.log('in production')
  module.exports={
    mongoURI:'mongodb+srv://nazarkdh:Deio9UqJDvJo3jHB@vidjots-prod.1ctyjwx.mongodb.net/?retryWrites=true&w=majority'
  }
}else{
  module.exports={
    mongoURI:'mongodb+srv://nazarkdh:Deio9UqJDvJo3jHB@vidjots-prod.1ctyjwx.mongodb.net/?retryWrites=true&w=majority'
    //mongoURI:'mongodb://localhost/vidjot-dev'
  }
}