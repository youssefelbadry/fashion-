 let logout = document.querySelector("#log-out")
 let userd = document.querySelector("#user")

 if(localStorage.getItem("username")){
    userd.innerHTML = localStorage.getItem("username")
 }


 logout.addEventListener("click" , function(){
    localStorage.clear()
    setTimeout(() =>{
     window.location = "register.html"
    },1500)
 })