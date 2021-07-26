window.addEventListener("load", function () {
    if (sessionStorage.getItem("jwt") && sessionStorage.getItem("userEmail")) {
        // Lo redirecciono a sus tareas
    }

    const form = document.forms[0];
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const datos = {
            email: inputEmail.value,
            password: inputPassword.value
        }

        const url = "https://ctd-todo-api.herokuapp.com/v1/users/login";

        const settings = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datos)
        }
        console.log("Consultando a la API...");
        fetch(url, settings)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                if(data.jwt){
                    sessionStorage.setItem("jwt", data.jwt);
                    sessionStorage.setItem("userEmail", inputEmail.value);
    
                    location.replace('/lista-tareas.html')
                }
            })
            .catch(error => console.log(error))



    })

})