
  const alerts=document.querySelectorAll('.alert')

  if(alerts.length>0){
    setTimeout(()=>{
      alerts.forEach(alert=>{
        alert.remove()
       
      })
    },3000)
  }
