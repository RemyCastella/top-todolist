import { pubsub } from "./pubsub"
import allTasksSvg from "./icons/inbox.svg"
import todaysTasksSvg from "./icons/today.svg"
import weeksTasksSvg from "./icons/week.svg"
import importantTasksSvg from "./icons/important.svg"
import { handleTaskGroupButton } from "./filterTasks"
export const taskForm = document.querySelector(".create-new-task")
export const taskFormTitle = document.querySelector(".task-form-title")
export const taskTitleInput = document.querySelector("#task-title-input")
export const taskDescriptionInput = document.querySelector("#task-description-input")
export const dueDateInput = document.querySelector("#due-date-input")
export const importantInput = document.querySelector("#important-task")
export const taskCancelButton = document.querySelector(".add-task-cancel")
taskCancelButton.addEventListener("click", e => {
    e.preventDefault()
    taskForm.close()
}) 

export const projectForm = document.querySelector(".create-new-project")
export const projectFormTitle = document.querySelector(".project-form-title")
export const projectTitleInput = document.querySelector("#project-title-input")
export const projectDescriptionInput = document.querySelector("#project-description-input")
export const projectCancelButton = document.querySelector(".add-project-cancel")
projectCancelButton.addEventListener("click", e => {
    e.preventDefault()
    projectForm.close()
})

export default function homepageUI() {
    const fragment = new DocumentFragment()

    //create sidebar container
    const sideBarContainer = document.createElement("div")
    sideBarContainer.classList.add("sidebar")

    //create + add brand name section
    const brandName = document.createElement("div")
    brandName.classList.add("brand-name")
    brandName.textContent = "TaskForce"
    sideBarContainer.appendChild(brandName)

    //create tasks by due date section
    const taskGroupContainer = document.createElement("nav")
    taskGroupContainer.classList.add("tasks-sidebar")

    //create + all tasks section and contents
    const allTasks = document.createElement("div")
    allTasks.classList.add("task-group")
    allTasks.classList.add("active")
    const allTasksIcon = document.createElement("img")
    allTasksIcon.src = allTasksSvg
    const allTasksButton = document.createElement("button")
    allTasksButton.textContent = "All Tasks"
    allTasksButton.addEventListener("click", e => handleTaskGroupButton(e))
    allTasks.appendChild(allTasksIcon)
    allTasks.appendChild(allTasksButton)
    taskGroupContainer.appendChild(allTasks)

    //create + add today's tasks section and contents
    const todaysTasks = document.createElement("div")
    todaysTasks.classList.add("task-group")
    const todaysTasksIcon = document.createElement("img")
    todaysTasksIcon.src = todaysTasksSvg
    const todaysTasksButton = document.createElement("button")
    todaysTasksButton.textContent = "Today"
    todaysTasksButton.addEventListener("click", e => handleTaskGroupButton(e))
    todaysTasks.appendChild(todaysTasksIcon)
    todaysTasks.appendChild(todaysTasksButton)
    taskGroupContainer.appendChild(todaysTasks)
    
    //create + add week's tasks section and contents
    const weeksTasks = document.createElement("div")
    weeksTasks.classList.add("task-group")
    const weeksTasksIcon = document.createElement("img")
    weeksTasksIcon.src = weeksTasksSvg
    const weeksTasksButton = document.createElement("button")
    weeksTasksButton.textContent = "This Week"
    weeksTasksButton.addEventListener("click", e => handleTaskGroupButton(e))
    weeksTasks.appendChild(weeksTasksIcon)
    weeksTasks.appendChild(weeksTasksButton)
    taskGroupContainer.appendChild(weeksTasks)

    //create + add important tasks section and contents
    const importantTasks = document.createElement("div")
    importantTasks.classList.add("task-group")
    const importantTasksIcon = document.createElement("img")
    importantTasksIcon.src = importantTasksSvg
    const importantTasksButton = document.createElement("button")
    importantTasksButton.textContent = "Important"
    importantTasksButton.addEventListener("click", e => handleTaskGroupButton(e))
    importantTasks.appendChild(importantTasksIcon)
    importantTasks.appendChild(importantTasksButton)
    taskGroupContainer.appendChild(importantTasks)
    sideBarContainer.appendChild(taskGroupContainer)


    //create tasks by project section
    const tasksByProject = document.createElement("nav")
    tasksByProject.classList.add("projects-sidebar")
    sideBarContainer.appendChild(tasksByProject)

    //create + add add project button
    const addProjectButton = document.createElement("button")
    addProjectButton.classList.add("add-project-btn")
    addProjectButton.textContent = "+"
    addProjectButton.addEventListener("click", e => handleAddProjectButton(e))
    sideBarContainer.appendChild(addProjectButton)

    //create project content container
    const projectContentContainer = document.createElement("div")
    projectContentContainer.classList.add("content")

    //create + add project header
    const projectHeader = document.createElement("div")
    projectHeader.classList.add("header-content")
    const projectTitle = document.createElement("div")
    projectTitle.classList.add("project-title")
    projectTitle.textContent = "All Tasks"
    const projectDescription = document.createElement("div")
    projectDescription.classList.add("project-description")
    const taskContainer = document.createElement("div")
    taskContainer.classList.add("tasks-content")
    projectHeader.appendChild(projectTitle)
    projectHeader.appendChild(projectDescription)
    projectContentContainer.appendChild(projectHeader)
    projectContentContainer.appendChild(taskContainer)

    const app = document.querySelector(".app")
    app.appendChild(sideBarContainer)
    app.appendChild(projectContentContainer)

}


function handleAddProjectButton(e) {

    projectForm.showModal()
    addProjectSubmitButton.textContent = "Add Project"
    projectFormTitle.textContent = "Add a project!"    

}

export const addProjectSubmitButton = document.querySelector(".add-project-submit")
addProjectSubmitButton.addEventListener("click", e => {
    e.preventDefault()

    if(addProjectSubmitButton.textContent === "Edit Project"){

        pubsub.publish("updateProjectInfo", {
            "Title": projectTitleInput.value,
            "Description": projectDescriptionInput.value
        })

        projectTitleInput.value = ""
        projectDescriptionInput.value = ""

        projectForm.close()

        return
    }

    pubsub.publish("newProjectInfo", {
        "Title": projectTitleInput.value,
        "Description": projectDescriptionInput.value
    })

    projectTitleInput.value = ""
    projectDescriptionInput.value = ""

    projectForm.close()
})

function renderProjects(fragment) {
    const projectSidebarTitle = document.createElement("div")
    projectSidebarTitle.classList.add("projects-sidebar-title")
    projectSidebarTitle.textContent = "#Projects"
    const tasksByProject = document.querySelector(".projects-sidebar")
    tasksByProject.innerHTML = ""
    tasksByProject.appendChild(projectSidebarTitle)
    tasksByProject.appendChild(fragment)
}

pubsub.subscribe("renderProjects", renderProjects)


export const addTaskSubmitButton = document.querySelector(".add-task-submit")
addTaskSubmitButton.addEventListener("click", e => {
    e.preventDefault()
    const activeProject = document.querySelector(".active")
    const activeProjectID = Number(activeProject.dataset.id)

    if(addTaskSubmitButton.textContent === "Edit Task"){
        
        const editedTaskInfo = {
            "Title": taskTitleInput.value, 
            "Description": taskDescriptionInput.value,
            "Due": dueDateInput.value,
            "Important": importantInput.checked,
            "ProjectID": activeProjectID
        }
        pubsub.publish("editTask", editedTaskInfo)

        addTaskSubmitButton.textContent = "Add Task"
        taskTitleInput.value = ""
        taskDescriptionInput.value = ""
        dueDateInput.value = ""
        importantInput.checked = false
        
        projectForm.close()

        return
    }

    const taskObj = { "Title": taskTitleInput.value, 
    "Description": taskDescriptionInput.value,
    "Due": dueDateInput.value,
    "Important": importantInput.checked,
    "ProjectID": activeProjectID,
    "Complete": false }

    pubsub.publish("newTaskInfo", taskObj)

    taskTitleInput.value = ""
    taskDescriptionInput.value = ""
    dueDateInput.value = ""
    importantInput.checked = false

    taskForm.close()

})

function renderTasks(fragment) {
    const taskContainer = document.querySelector(".tasks-content")
    taskContainer.innerHTML = ""
    taskContainer.appendChild(fragment)
}

pubsub.subscribe("renderTasks", renderTasks)