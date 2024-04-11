import "./style.css"
import { pubsub } from "./pubsub.js"
import "./createTask.js"
import "./updateTaskLibrary.js"
import "./createTaskElements.js"
import "./filterTasks.js"
import "./createProjectObject.js"
import "./updateProjectLibrary.js"
import "./createProjectElements.js"
import "./localStorage.js"
import homepageUI from "./UI.js"
import { sampleProject, sampleTasks } from "./sampleData.js"
import { setTaskLibrary, getTaskLibrary } from "./updateTaskLibrary.js"
import { setProjectLibrary, getProjectLibrary } from "./updateProjectLibrary.js"

window.homepageUI = homepageUI
window.getTaskLibrary = getTaskLibrary
window.getProjectLibrary = getProjectLibrary

homepageUI()
pubsub.publish("relayStoredTasks")
pubsub.publish("relayStoredProjects")
