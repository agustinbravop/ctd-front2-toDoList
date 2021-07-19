// Documentación de la API: https://ctd-todo-api.herokuapp.com/#/
// API base url: https://ctd-todo-api.herokuapp.com/v1

const form = document.querySelector("form")
const password = form.elements['password'];
const email = form.elements['email'];

form.addEventListener("submit", event => {
    event.preventDefault();
    
    let errors = []

    if( !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) ){
        errors.push( [email, "El email ingresado no es válido"] );
    }

    if(errors.length > 0){
        for(el of form){
            if(el.nextSibling == null){
                el.after(" ")
            }
            el.nextSibling.textContent = ""
        }
        for(let error of errors){
            error[0].nextSibling.textContent = error[1]
        }
    }
    else {
        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
        })
        .then(response => {
            console.log(response)
            switch(response.status){
                case 201: return response.json()
                case 400: throw "Contraseña incorrecta"
                case 404: throw "El usuario no existe"
                default: throw "Hubo un error, vuelva a intentar"
            }
        })
        .then(data => {
            // stores in sessionStorage the Json Web Token
            console.log(data)
            sessionStorage.setItem("jwt", data.jwt);
            window.location.href = "./to-do-list.html"
        })
        .catch(err => {
            const btn = document.querySelector("#login-btn")
            btn.nextSibling.textContent = err
        })

    }


})