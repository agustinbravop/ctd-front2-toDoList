// Documentación de la API: https://ctd-todo-api.herokuapp.com/#/

function renderTasks(tasks){
    const completedTasks = document.querySelector(".tareas-terminadas");
    const pendingTasks = document.querySelector('.tareas-pendientes');
    let ulTasks;
    for(let task of tasks){
        ulTasks = task.completed ? completedTasks : pendingTasks;
        ulTasks.innerHTML += `
        <li class="tarea" data-id=${task.id} data-completed=${task.completed}>
            <div class="not-done" ></div>
            <div class="descripcion">
                <p class="nombre">${task.description}</p>
                <p class="timestamp">Creada: ${new Date(task.createdAt).toLocaleDateString("es-AR")}</p>
            </div>
            <button class="icon-delete-task"><i class="fas fa-minus-square"></i></button>
        </li>
        `
    }
}

// Load user's tasks. GETS whole list of this user's tasks
let tasks;

fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "GET",
    headers: {
        Authorization: sessionStorage.getItem("jwt")
    }
})
.then(response => {
    return response.json()
})
.then(taskList => {
    tasks = taskList;
    renderTasks(taskList);
    loadEventDeleteTask();
})

// Add new task. POSTS the new task and renders it's response.
const form = document.querySelector("form")

form.addEventListener("submit", event => {
    event.preventDefault();

    // const today = new Date
    // const dd = today.getDate()  // devuelve el día
    // const mm = today.getMonth() + 1 // Enero es 0
    // const yy = today.getFullYear() % 100 // mod devuelve los primeros 2 digitos
    // newTask.timestamp = dd + "/" + mm + "/" + yy;
    const text = form.elements['text']
    
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.jwt,
        },
        body: JSON.stringify({
            description: text.value,
            completed: false
        })
    })
    .then(response => {
        return response.json()
    })
    .then(newTask => {
        renderTasks( [newTask] ) // renderTasks takes arrays as param
    })
    .catch(err => {
        console.err(err)
    })

    text.value = "" // empties the input box for UX reasons
})

// Delete a task. Makes a DELETE request.

function loadEventDeleteTask() {
    const deleteButtons = document.querySelectorAll(".icon-delete-task");

    deleteButtons.forEach(btn => {
        btn.addEventListener("click", e => {
            console.log(e.target)
            console.log(e.target.parentElement)
            console.log(e.target.parentElement.dataset)
            console.log(e.target.parentElement.dataset.id)
            const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${e.target.parentElement.parentElement.dataset.id}`

            // removes task from API
            fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: sessionStorage.getItem("jwt"),
                }
            })
            .then( () => {
                // removes task from UI
                e.target.parentElement.parentElement.remove();
            })

        })
    })
}