// If the user is not logged in, prevent access

if(!sessionStorage.getItem("jwt")){
    window.location.href = "./index.html"
}