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
    
    pubsub.publish("relayStoredTasks")
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
    projectTitleElement.textContent = currentProject[0].Title
    projectDescriptionElement.textContent = currentProject[0].Description

    pubsub.publish("relayStoredTasks")
}

function filterTasks(taskLibraryParsed) {

    const projectTitleElement = document.querySelector(".project-title")
    const currentProjectTitle = projectTitleElement.textContent

    if (currentProjectTitle === "All Tasks"){
        projectTitleElement.textContent = "All Tasks"
        pubsub.publish("createTaskElements", taskLibraryParsed)
    } else if (currentProjectTitle === "Today") {
        console.log(taskLibraryParsed)
        projectTitleElement.textContent = "Today"
        filterTasksByToday(taskLibraryParsed)
    } else if (currentProjectTitle === "This Week") {
        projectTitleElement.textContent = "This Week"
        filterTasksByWeek(taskLibraryParsed)
    } else if (currentProjectTitle === "Important") {
        projectTitleElement.textContent = "Important"
        filterTasksByImportance(taskLibraryParsed)
    }

}
pubsub.subscribe("filterTasksByTaskGroup", filterTasks)


function filterTasksByProject(taskLibrary) {

    const currentProject = document.querySelector(".active")
    const currentProjectID = Number(currentProject.dataset.id)
    const currentTasks = taskLibrary.filter(task => task.ProjectID === currentProjectID)

    pubsub.publish("createTaskElements", currentTasks)

    //Add task button only for projects
    pubsub.publish("addTaskButton")

}
pubsub.subscribe("filterTasksByProject", filterTasksByProject)


function filterTasksByImportance(taskLibrary) {
    console.log(taskLibrary)
    const importantTasks = taskLibrary.filter(task => task.Important === true)
    pubsub.publish("createTaskElements", importantTasks)
}

function filterTasksByToday(taskLibrary) {
    const todaysTasks = taskLibrary.filter(task => isToday(task.Due))
    pubsub.publish("createTaskElements", todaysTasks)
}

function filterTasksByWeek(taskLibrary) {
    console.log(taskLibrary)
    const weeksTasks = taskLibrary.filter(task => isThisWeek(task.Due))
    pubsub.publish("createTaskElements", weeksTasks)
}
