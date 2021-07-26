//solo dejo acceder si existe un usuario loggeado
if (sessionStorage.jwt) {
    window.addEventListener("load", function () {
        //renderizamos el nombre del usuario en el navbar
        if (sessionStorage.userEmail) {
            const userName = document.querySelector('.user-info p')
            userName.innerText = sessionStorage.userEmail.split('@')[0];
        }
        //aplicamos la logica de cerrar sesion
        const btnCerrar = this.document.querySelector('#cerrarSesion');
        btnCerrar.addEventListener('click', function () {
            let confirmar = confirm("¿Desea cerrar sesión?")
            if (confirmar) {
                sessionStorage.clear();
                location.replace('/login.html');
            }

        })

        //variables globales
        const tareasPendientes = document.querySelector('.tareas-pendientes')
        const tareasTerminadas = document.querySelector('.tareas-terminadas')

        //configurando la petición
        const tareasUrl = "https://ctd-todo-api.herokuapp.com/v1/tasks";
        const settings = {
            method: 'GET',
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
        }

        solicitarTareas();

        function solicitarTareas() {
            //solicitando todas las tareas del usuario
            fetch(tareasUrl, settings)
                .then(function (response) {
                    return response.json()
                })
                .then(function (tasks) {
                    console.log(tasks)
                    //renderizamos la tareas segun su estado
                    renderizarTareas(tasks);
                    cambioEstado()
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        function cambioEstado() {
            //seleccionamos los botones
            const btnCambioEstado = this.document.querySelectorAll('.tareas-pendientes .not-done')
            console.log(btnCambioEstado);

            btnCambioEstado.forEach(boton => {
                //a cada boton le asignamos una funcionalidad
                boton.addEventListener('click', function(event) {
                    const id = event.target.id;

                    const url = `${tareasUrl}/${id}`

                    const settingsCambio = {
                        method: 'PUT',
                        headers: {
                            "Authorization": sessionStorage.getItem("jwt"),
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            completed: true
                        })
                    }
                    fetch(url, settingsCambio)
                    .then( response => {
                        console.log(response.status);
                        //renderizar nuevamente las tareas
                        solicitarTareas();
                    })
                })
            });

        }


        function renderizarTareas(listado) {
            //primero limpio los contenedores
            tareasPendientes.innerHTML="";
            tareasTerminadas.innerHTML="";

            listado.forEach(tarea => {
                //filtrar si la tarea está finalizada o no
                let fecha = new Date(tarea.createdAt);

                if (tarea.completed) {
                    tareasTerminadas.innerHTML += `
                        <li class="tarea">
                            <div class="done"></div>
                            <div class="descripcion">
                            <div>
                                <button id="${tarea.id}"><i class="fas fa-undo-alt"></i></button>
                                <button id="${tarea.id}"><i class="far fa-trash-alt"></i></button>
                            </div>
                                <p class="nombre">${tarea.description}</p>
                                <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()} <i class="far fa-clock"></i>${fecha.getHours()}:${fecha.getMinutes()}</p>
                            </div>
                        </li>
                        `
                } else {
                    tareasPendientes.innerHTML += `
                        <li class="tarea">
                            <div class="not-done" id="${tarea.id}"></div>
                            <div class="descripcion">
                                <p class="nombre">${tarea.description}</p>
                                <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()} <i class="far fa-clock"></i>${fecha.getHours()}:${fecha.getMinutes()}</p>
                            </div>
                        </li>
                        `
                }
            });
        }





    })
} else {
    location.replace('/login.html');
}


/* <li class="tarea">
      <div class="not-done"></div>
      <div class="descripcion">
        <p class="nombre">Mi hermosa tarea</p>
        <p class="timestamp">Creada: 19/04/20</p>
      </div>
    </li> */