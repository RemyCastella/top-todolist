import { format } from "date-fns";
import { pubsub } from "./pubsub";
import deleteSvg from "./icons/trash.svg"
import editSvg from "./icons/pencil.svg"
import { deleteTask, handleEditTaskButton } from "./updateTaskLibrary";
import { taskForm } from "./UI";

export default function createTaskElements(arr) {
    
    const fragment = new DocumentFragment()

    arr.forEach(task => {
        const taskElement = document.createElement("div")
        taskElement.classList.add("task")
        taskElement.dataset.id = task.TaskID
        if(task.Important) {
            taskElement.classList.add("important")
        }
        if(task.Complete){
            taskElement.classList.add("complete")
        }
        taskElement.addEventListener("mouseenter",  () => {
            taskLabel.style.display = "none"
            dueDate.style.display = "none"
            taskDescription.style.display = "block"
        })      
       
        taskElement.addEventListener("mouseleave", () => {
            taskLabel.style.display = "block"
            dueDate.style.display = "block"
            taskDescription.style.display = "none"
        })

        //create left side of task card
        const taskCardLeft = document.createElement("div")
        taskCardLeft.classList.add("items-left")
        const checkBox = document.createElement("input")
        checkBox.type = "checkbox"
        checkBox.classList.add("check-task")
        if(task.Complete){
            checkBox.checked = true
        }
        checkBox.addEventListener("change", e => {
            e.target.parentNode.parentNode.classList.toggle("complete")
            task.Complete ? task.Complete = false : task.Complete = true 
        })
        const taskLabel = document.createElement("div")
        taskLabel.classList.add("task-label")
        taskLabel.textContent = task.Title
        const dueDate = document.createElement("div")
        dueDate.classList.add("task-due")
        dueDate.textContent = task.Due ? `Due: ${format(task.Due, "PP")}` : "Due date not set"
        taskCardLeft.appendChild(checkBox)
        taskCardLeft.appendChild(taskLabel)
        taskCardLeft.appendChild(dueDate)

        //create right side of task card
        const taskCardRight = document.createElement("div")
        taskCardRight.classList.add("items-right")
        const editTaskIcon = document.createElement("img")
        editTaskIcon.src = editSvg
        editTaskIcon.addEventListener("click", e => handleEditTaskButton(e))
        const deleteTaskIcon = document.createElement("img")
        deleteTaskIcon.src = deleteSvg
        deleteTaskIcon.addEventListener("click", e => deleteTask(e))

        taskCardRight.appendChild(editTaskIcon)
        taskCardRight.appendChild(deleteTaskIcon)
  
        const taskDescription = document.createElement("div")
        taskDescription.classList.add("task-description")
        taskDescription.textContent
        taskDescription.textContent = "No description"
        taskDescription.textContent = task.Description
        taskDescription.style.display = "none"

        taskCardLeft.appendChild(taskDescription)
        taskElement.appendChild(taskCardLeft)
        taskElement.appendChild(taskCardRight)
        fragment.appendChild(taskElement)
        
    })


    pubsub.publish("renderTasks", fragment)
}

pubsub.subscribe("createTaskElements", createTaskElements)

function addTaskButton() {

    const taskContainer = document.querySelector(".tasks-content")
    const addTaskButton = document.createElement("button")
    addTaskButton.classList.add("add-task-btn")
    addTaskButton.textContent = "+"
    addTaskButton.addEventListener("click", e => {
        taskForm.showModal()
    })
    
    taskContainer.appendChild(addTaskButton)

}

pubsub.subscribe("addTaskButton", addTaskButton)