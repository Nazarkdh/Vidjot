if(process.env.NODE_ENV==='production'){
  console.log('1-in Node-env:',process.env.NODE_ENV)
  module.exports={
    mongoURI:'mongodb+srv://nazarkdh:Deio9UqJDvJo3jHB@vidjots-prod.1ctyjwx.mongodb.net/?retryWrites=true&w=majority'
  }
}else{
  console.log('2 in Node-env:',process.env.NODE_ENV)
  module.exports={
    mongoURI:'mongodb+srv://nazarkdh:Deio9UqJDvJo3jHB@vidjots-prod.1ctyjwx.mongodb.net/?retryWrites=true&w=majority'
    //mongoURI:'mongodb://localhost/vidjot-dev'
  }
}