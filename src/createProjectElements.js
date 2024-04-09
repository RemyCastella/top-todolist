import { pubsub } from "./pubsub";
import projectSvg from "./icons/project.svg"
import deleteSvg from "./icons/trash.svg"
import editSvg from "./icons/pencil.svg"
import { handleEditProjectButton, deleteProject } from "./updateProjectLibrary";
import { handleProjectButton } from "./filterTasks";



export default function createProjectElements(arr) {

    const fragment = new DocumentFragment()

    arr.forEach(project => {
        
        const newProjectContainer = document.createElement("div")
        newProjectContainer.classList.add("task-group")
        newProjectContainer.classList.add("project")
        newProjectContainer.dataset.id = project.ProjectID
        const projectIcon = document.createElement("img")
        projectIcon.src = projectSvg
        const projectButton = document.createElement("button")
        projectButton.textContent = project.Title
        projectButton.addEventListener("click", e => handleProjectButton(e))
        const editProjectButton = document.createElement("img")
        editProjectButton.src = editSvg
        editProjectButton.classList.add("clickable")
        editProjectButton.dataset.id = project.ProjectID
        editProjectButton.addEventListener("click", e => handleEditProjectButton(e))
        const deleteProjectButton = document.createElement("img")
        deleteProjectButton.src = deleteSvg
        deleteProjectButton.classList.add("clickable")
        deleteProjectButton.dataset.id = project.ProjectID
        deleteProjectButton.addEventListener("click", e => deleteProject(e))
        newProjectContainer.appendChild(projectIcon)
        newProjectContainer.appendChild(projectButton)
        newProjectContainer.appendChild(editProjectButton)
        newProjectContainer.appendChild(deleteProjectButton)
        fragment.appendChild(newProjectContainer)

    })

    pubsub.publish("renderProjects", fragment)
} 

pubsub.subscribe("createProjectElements", createProjectElements)
