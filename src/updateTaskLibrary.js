import { pubsub } from "./pubsub";
import { taskForm, 
    taskFormTitle, 
    taskTitleInput, 
    taskDescriptionInput, 
    dueDateInput,
    importantInput, 
    addTaskSubmitButton } from "./UI";

let taskLibrary = []

export function setTaskLibrary(arr) {
    taskLibrary = arr
    localStorage.setItem("taskLibrary", JSON.stringify(taskLibrary))
}

pubsub.subscribe("setTaskLibrary", setTaskLibrary)

export function getTaskLibrary() {
    return taskLibrary
}

export function addTask(obj) {

    taskLibrary.push(obj)
    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")
    
}
pubsub.subscribe("newTask", addTask)


export function deleteTask(e) {
    
    let taskLibrary = getTaskLibrary()
    const targetTaskID = e.target.parentElement.parentElement.dataset.id
   
    //remove the target task from the task library
    taskLibrary = taskLibrary.filter(task => task.TaskID !== Number(targetTaskID))
    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")

    const activeTaskGroup = document.querySelector(".active")
    const activeTaskGroupTitle = activeTaskGroup.childNodes[1].textContent

    if (activeTaskGroup.classList.contains("project")){
        pubsub.publish("filterTasksByProject", taskLibrary)
    } else {
        pubsub.publish("filterTasksByTaskGroup", activeTaskGroupTitle)
    }
}

let currentTaskIndex = 0

export function handleEditTaskButton(e) {

    let taskLibrary = getTaskLibrary()
    const targetTaskID = e.target.parentElement.parentElement.dataset.id
    currentTaskIndex = taskLibrary.findIndex(task => task.TaskID === Number(targetTaskID))
    const currentTask = taskLibrary[currentTaskIndex]

    taskForm.showModal()
    taskFormTitle.textContent = "Edit Your Task!"
    addTaskSubmitButton.textContent = "Edit Task"
    taskTitleInput.value = currentTask.Title
    taskDescriptionInput.value = currentTask.Description
    dueDateInput.value = currentTask.Due
    importantInput.checked = currentTask.Important

} 

export function editTask(obj) {

    let taskLibrary = getTaskLibrary()
    const currentTask = taskLibrary[currentTaskIndex]
    currentTask.Title = obj.Title
    currentTask.Description = obj.Description
    currentTask.Due = obj.Due
    currentTask.Important = obj.Important

    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")

    const activeTaskGroup = document.querySelector(".active")
    const activeTaskGroupTitle = activeTaskGroup.childNodes[1].textContent

    if (activeTaskGroup.classList.contains("project")){
        pubsub.publish("filterTasksByProject", taskLibrary)
    } else {
        pubsub.publish("filterTasksByTaskGroup", activeTaskGroupTitle)
    }

    taskForm.close()
}

pubsub.subscribe("editTask", editTask)
