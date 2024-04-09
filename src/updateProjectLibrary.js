import { pubsub } from "./pubsub"
import { projectForm, projectFormTitle, projectTitleInput, projectDescriptionInput, addProjectSubmitButton } from "./UI";
import { getTaskLibrary } from "./updateTaskLibrary";

let projectLibrary = []

export function setProjectLibrary(arr) {
    projectLibrary = arr
}
pubsub.subscribe("setProjectLibrary", setProjectLibrary)

export function getProjectLibrary() {
    return projectLibrary
}

export function addProject(obj) {
    projectLibrary.push(obj)
    pubsub.publish("setProjectLibrary", projectLibrary)
    pubsub.publish("createProjectElements", projectLibrary)
}
pubsub.subscribe("newProject", addProject)

let projectToEditIndex = 0

export function handleEditProjectButton(e) {
    projectToEditIndex = projectLibrary.findIndex(project => project.ProjectID === Number(e.target.dataset.id))
    const projectToUpdate = projectLibrary[projectToEditIndex]
    addProjectSubmitButton.textContent = "Edit Project"
    projectFormTitle.textContent = "Edit your project!"
    projectTitleInput.value = projectToUpdate.Title
    projectDescriptionInput.value = projectToUpdate.Description
    projectForm.showModal()
        
}

function updateProjectInfo(obj) {

    const projectToUpdate = projectLibrary[projectToEditIndex]

    //Get tasks for the project to update
    const taskLibrary = getTaskLibrary()
    const filteredTaskLibrary = taskLibrary.filter(task => task.ProjectID === projectToUpdate.Title)

     //Update tasks and project with new information
    filteredTaskLibrary.forEach(task => task.ProjectID = obj.Title)
    projectToUpdate.Title = obj.Title
    projectToUpdate.Description = obj.Description

    pubsub.publish("setTaskLibrary", taskLibrary)
    pubsub.publish("setProjectLibrary", projectLibrary)
    pubsub.publish("createProjectElements", projectLibrary)
}
pubsub.subscribe("updateProjectInfo", updateProjectInfo)

export function deleteProject(e) {
    projectLibrary = projectLibrary.filter(project => project.ProjectID !== Number(e.target.dataset.id))
    
    pubsub.publish("setProjectLibrary", projectLibrary)
    pubsub.publish("createProjectElements", projectLibrary)
}
