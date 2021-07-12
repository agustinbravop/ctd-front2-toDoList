let listaTareasPendientes = JSON.parse(localStorage.getItem("listToDo"));
const ulTareasPendientes = document.querySelector('.tareas-pendientes');

if(listaTareasPendientes){
    for(let pendiente of listaTareasPendientes){
        ulTareasPendientes.innerHTML += `
            <li class="tarea">
                <div class="not-done"></div>
                <div class="descripcion">
                    <p class="nombre">${pendiente.nombre}</p>
                    <p class="timestamp">Creada: ${pendiente.timestamp}</p>
                </div>
            </li>
        `
    }
} else {
    listaTareasPendientes = []
}

const form = document.querySelector("form")

form.addEventListener("submit", event => {
    event.preventDefault();

    let nuevaTareaPendiente = {}

    const text = document.querySelector("input[type='text']")
    
    if(text.value == ""){ return } // empty toDo is invalid

    nuevaTareaPendiente.nombre = text.value

    const today = new Date
    const dd = today.getDate()  // devuelve el día
    const mm = today.getMonth() + 1 // Enero es 0
    const yy = today.getFullYear() % 100 // mod devuelve los primeros 2 digitos
    nuevaTareaPendiente.timestamp = dd + "/" + mm + "/" + yy;
    
    listaTareasPendientes.push(nuevaTareaPendiente);
    localStorage.setItem("listToDo", JSON.stringify(listaTareasPendientes));

    ulTareasPendientes.innerHTML += `
        <li class="tarea">
            <div class="not-done"></div>
            <div class="descripcion">
                <p class="nombre">${nuevaTareaPendiente.nombre}</p>
                <p class="timestamp">Creada: ${nuevaTareaPendiente.timestamp}</p>
            </div>
        </li>
    `
})