window.addEventListener("load", function () {
    if (sessionStorage.getItem("jwt") && sessionStorage.getItem("userEmail")) {
        // Lo redirecciono a sus tareas
    }
    let formRegister = document.querySelector("#formRegister");
    let inputFirstName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputPassword = document.querySelector("#password");
    let inputRePassword = document.querySelector("#rePassword");
    let inputEmail = document.querySelector("#email");

    formRegister.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Hacer una validación...
        
        let datos = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            email: inputEmail.value,
            password: inputPassword.value
        };
        console.log(datos);
        
        
        const url = "https://ctd-todo-api.herokuapp.com/v1/users";
        
        const settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datos)
        }
        //validando datos completos
        if (datos.firstName!=="" && datos.lastName!=="" && datos.email!=="" && datos.password!=="") {
            console.log("Consultando la API...");
            fetch(url, settings)
                .then(function (response) {
                    return response.json()
                })
                // Si todo salió bien...
                .then(function (token) {
                    console.log(token);
                    sessionStorage.setItem("jwt", token.jwt);
                    sessionStorage.setItem("userEmail", inputEmail.value);
                    
                    window.location.href = "lista-tareas.html"
                })
                .catch(function (error) {
                        alert("Hey! Algo salió mal... Volvé a intentarlo...")
                    }

                )
        } else{
            console.log("Algunos de los campos no está completo.");
        }
    })
})