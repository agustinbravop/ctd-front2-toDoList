// Documentación de la API: https://ctd-todo-api.herokuapp.com/#/
// API base url: https://ctd-todo-api.herokuapp.com/v1

const form = document.querySelector("form")
const firstName = form.elements['firstName'];
const lastName = form.elements['lastName'];
const password = form.elements['password'];
const repassword = form.elements['repassword'];
const email = form.elements['email'];

form.addEventListener("submit", event => {
    event.preventDefault();
    
    let errors = []

    if(password.value != repassword.value){
        errors.push( [repassword, "Las contraseñas no coinciden"] );
    }
    if( !/[0-9]/.test(password.value) ){
        errors.push( [password, "La contraseña debe contener números"] )
    }
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
            // [0] is the HTML element, [1] is the error message
            error[0].nextSibling.textContent = error[1]
        }
    }
    else {
        fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            }),
        })
        .then(response => {
            switch(response.status){
                case 200: return response.json();
                case 400: throw "El usuario ya se encuentra registrado"
                default: throw "Hubo un error, vuelva a intentar"
            }
        })
        .then(data => {
            // stores in sessionStorage the Json Web Token
            sessionStorage.setItem("jwt", data.jwt);
            // window.location.href = "./to-do-list.html"
        })
        .catch(err => {
            const btn = document.querySelector("#register-btn")
            btn.nextSibling.textContent = err
        })

    }

})