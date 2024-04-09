import { isToday, isThisWeek } from "date-fns"
import { pubsub } from "./pubsub"
import { getTaskLibrary } from "./updateTaskLibrary"
import { getProjectLibrary } from "./updateProjectLibrary"


export function handleTaskGroupButton(e) {
    //Highlight selected task group
    const taskGroups = document.querySelectorAll(".task-group")
    const activeTaskGroup = document.querySelector(".task-group.active")
    if (activeTaskGroup) {
        activeTaskGroup.classList.remove("active")
    }
    
    taskGroups.forEach(group => {
        if(group.childNodes[1].textContent === e.target.textContent){
            e.target.parentElement.classList.add("active")
        }
    })


    const projectTitleElement = document.querySelector(".project-title")
    const projectDescriptionElement = document.querySelector(".project-description")

    projectTitleElement.textContent = e.target.textContent
    projectDescriptionElement.textContent = ""
    filterTasks(e.target.textContent)

}


export function handleProjectButton(e) {

    //Highlight selected project
    const taskGroups = document.querySelectorAll(".task-group")
    const activeTaskGroup = document.querySelector(".task-group.active")
    if (activeTaskGroup) {
        activeTaskGroup.classList.remove("active")
    }
    
    taskGroups.forEach(group => {
        if(group.childNodes[1].textContent === e.target.textContent){
            e.target.parentElement.classList.add("active")
        }
    })

    const projectTitleElement = document.querySelector(".project-title")
    const projectDescriptionElement = document.querySelector(".project-description")
    const targetID = Number(e.target.parentElement.dataset.id)
    const projectLibrary = getProjectLibrary()
    const currentProject = projectLibrary.filter(project => project.ProjectID === targetID)
    const currentProjectTitle = currentProject[0].Title
    projectTitleElement.textContent = currentProject[0].Title
    projectDescriptionElement.textContent = currentProject[0].Description
    
    const taskLibrary = getTaskLibrary()
    filterTasksByProject(taskLibrary)
}



function filterTasks(currentProjectTitle) {
   
    const projectTitleElement = document.querySelector(".project-title")
    const projectDescriptionElement = document.querySelector(".project-description")
    const taskLibrary = getTaskLibrary()

    if (currentProjectTitle === "All Tasks"){
        projectTitleElement.textContent = "All Tasks"
        pubsub.publish("createTaskElements", taskLibrary)
    } else if (currentProjectTitle === "Today") {
        projectTitleElement.textContent = "Today"
        filterTasksByToday(taskLibrary)
    } else if (currentProjectTitle === "This Week") {
        projectTitleElement.textContent = "This Week"
        filterTasksByWeek(taskLibrary)
    } else if (currentProjectTitle === "Important") {
        projectTitleElement.textContent = "Important"
        filterTasksByImportance(taskLibrary)
    }

}
pubsub.subscribe("filterTasksByTaskGroup", filterTasks)


function filterTasksByProject(arr) {

    const currentProject = document.querySelector(".active")
    const currentProjectID = Number(currentProject.dataset.id)
    const currentTasks = arr.filter(task => task.ProjectID === currentProjectID)

    pubsub.publish("createTaskElements", currentTasks)

}

pubsub.subscribe("filterTasksByProject", filterTasksByProject)

function filterTasksByImportance(arr) {
    const importantTasks = arr.filter(task => task.Important === true)
    pubsub.publish("createTaskElements", importantTasks)
}

function filterTasksByToday(arr) {
    const todaysTasks = arr.filter(task => isToday(task.Due))
    pubsub.publish("createTaskElements", todaysTasks)
}

function filterTasksByWeek(arr) {
    const weeksTasks = arr.filter(task => isThisWeek(task.Due))
    pubsub.publish("createTaskElements", weeksTasks)
}
