// Documentación de la API: https://ctd-todo-api.herokuapp.com/#/

function renderTasks(tasks){
    const completedTasks = document.querySelector(".tareas-terminadas");
    const pendingTasks = document.querySelector('.tareas-pendientes');
    for(let task of tasks){
        let ulTasks = task.completed ? completedTasks : pendingTasks;
        ulTasks.innerHTML += `
        <li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
                <p class="nombre">${task.description}</p>
                <p class="timestamp">Creada: ${task.createdAt.substring(0, 10)}</p>
            </div>
        </li>
        `
    }
}

// Load user's tasks. GETS whole list of this user's tasks
let tasks;

fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "GET",
    headers: {
        Authorization: sessionStorage.jwt
    }
})
.then(response => {
    return response.json()
})
.then(taskList => {
    tasks = taskList;
    renderTasks(taskList)
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
            "Content-Type": "application/json",            authorization: sessionStorage.jwt,
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