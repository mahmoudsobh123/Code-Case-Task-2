var input = document.querySelector(".inp")
var submit = document.querySelector(".addList")
var taskDiv = document.querySelector(".list-div")

// Empty Array To Store Tasks
var ArrayOfTasks =[];

// Tasks in Local Storage ??
if(localStorage.getItem("tasks")){
    ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

// Triger Get Data From Local Storage Function
getDataToLocalStorageFrom();

// Add Task
submit.onclick = function (){
    if(input.value !== ""){
        addTaskToArray(input.value);   // Add task to array of tasks
        input.value = "";  // Empty Input Field
    }
}

// Delete Tasks
taskDiv.addEventListener("click" , (e) =>{
    if(e.target.classList.contains("del")){
        // Remove Task From Local Storage
        deleteTask(e.target.parentElement.getAttribute("data-id"))
        // remove Element From Page
        e.target.parentElement.remove()
    }
})

function addTaskToArray (TaskText){
    // Task Data
    const task = {
        id: Date.now(),
        title: TaskText,
        completed: false
    };
    // Push Task To Array Of Tasks
    ArrayOfTasks.push(task)
    // Add Tasks Ro Page
    addElementsToPageFrom(ArrayOfTasks)
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(ArrayOfTasks)
}

function addElementsToPageFrom(ArrayOfTasks){
    // Empty Tasks Div
    taskDiv.innerHTML = "";
    // Looping On Array Of Tasks
    ArrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div")
        div.className = "task"
        // Check if Task Done
        if(task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id" , task.id)
        div.appendChild(document.createTextNode(task.title))
        // Create Delete Button
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        // Append Button To Main Div
        div.appendChild(span)
        taskDiv.appendChild(div)
    });
}

function addDataToLocalStorageFrom(ArrayOfTasks){
    localStorage.setItem("tasks" , JSON.stringify(ArrayOfTasks))
}

function getDataToLocalStorageFrom (){
    let data = localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
    }
}

function deleteTask(taskId){
    ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(ArrayOfTasks)
}