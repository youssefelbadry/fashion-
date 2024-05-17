let username = document.querySelector("#username")
let password = document.querySelector("#password")
let login = document.querySelector("#login")

let getuser = localStorage.getItem("username")
let getPassword = localStorage.getItem("password")


login.addEventListener("click" , function(e){
e.preventDefault
if(username.value === "" || password.value === ""){
    alert("Please Fill Your Data")
}else
   if ((getuser.trim() === username.value.trim() || getPassword.trim() === password.value.trim()))
    {
        setTimeout(() => {
           window.location = "index.html"
        }, 1500)
    }else{
        alert("Your Nmae Or Password Is Wrong")
    }

})
