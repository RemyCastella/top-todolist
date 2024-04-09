import "./style.css"
import { pubsub } from "./pubsub.js"
import "./createTask.js"
import "./updateTaskLibrary.js"
import "./createTaskElements.js"
import "./filterTasks.js"
import "./createProjectObject.js"
import "./updateProjectLibrary.js"
import "./createProjectElements.js"
import createTask from "./createTask.js"
import { addTask, getTaskLibrary } from "./updateTaskLibrary.js"
import { updateProjectLibrary, getProjectLibrary } from "./updateProjectLibrary.js"
import homepageUI from "./UI.js"
import { sampleProject, sampleTasks } from "./sampleData.js"
import createProjectObject from "./createProjectObject.js"

window.createTask = createTask
window.addTask = addTask
window.homepageUI = homepageUI
window.getTaskLibrary = getTaskLibrary
window.getProjectLibrary = getProjectLibrary

homepageUI()
sampleTasks.forEach(task => createTask(task))
sampleProject.forEach(project => createProjectObject(project))
const taskLibrary = getTaskLibrary()
pubsub.publish("createTaskElements", taskLibrary)

const taskLibraryJSON = JSON.stringify(getTaskLibrary())
localStorage.setItem("taskLibrary", taskLibraryJSON)

const taskLibraryObj = JSON.parse(localStorage.getItem("taskLibrary"))
console.log(taskLibraryObj)

