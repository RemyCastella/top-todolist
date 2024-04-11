import { pubsub } from "./pubsub";
import { taskForm, 
    taskFormTitle, 
    taskTitleInput, 
    taskDescriptionInput, 
    dueDateInput,
    importantInput, 
    addTaskSubmitButton } from "./UI";

export function setTaskLibrary(arr) {
    localStorage.setItem("taskLibrary", JSON.stringify(arr))
}
pubsub.subscribe("setTaskLibrary", setTaskLibrary)

export function getTaskLibrary() {
    const taskLibraryString = localStorage.getItem("taskLibrary")
    return JSON.parse(taskLibraryString)
}

export function addTask(obj) {

    const taskLibrary = getTaskLibrary()
    taskLibrary.push(obj)
    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")
    
}
pubsub.subscribe("newTask", addTask)


export function deleteTask(e) {
    
    const targetTaskID = e.target.parentElement.parentElement.dataset.id
   
    //remove the target task from the task library
    let taskLibrary = getTaskLibrary()
    taskLibrary = taskLibrary.filter(task => task.TaskID !== Number(targetTaskID))
    
    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")
}

let currentTaskIndex = 0

export function handleEditTaskButton(e) {
    
    const taskLibrary = getTaskLibrary()
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

    const taskLibrary = getTaskLibrary()
    const currentTask = taskLibrary[currentTaskIndex]
    currentTask.Title = obj.Title
    currentTask.Description = obj.Description
    currentTask.Due = obj.Due
    currentTask.Important = obj.Important

    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("relayStoredTasks")

    taskForm.close()
}

pubsub.subscribe("editTask", editTask)
