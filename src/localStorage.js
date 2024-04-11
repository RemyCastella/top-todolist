import { pubsub } from "./pubsub";
import { setTaskLibrary } from "./updateTaskLibrary";
import { setProjectLibrary } from "./updateProjectLibrary";
import { sampleTasks, sampleProjects } from "./sampleData";

function relayStoredTasks() {

    const taskLibraryParsed = JSON.parse(localStorage.getItem("taskLibrary")) || loadDefaultTasks(sampleTasks)

    const activeTaskGroup = document.querySelector(".active")

    if (activeTaskGroup.classList.contains("project")){
        pubsub.publish("filterTasksByProject", taskLibraryParsed)
    } else {
        pubsub.publish("filterTasksByTaskGroup", taskLibraryParsed)
    }

}
pubsub.subscribe("relayStoredTasks", relayStoredTasks)

function relayStoredProjects() {
    const projectLibraryParsed = JSON.parse(localStorage.getItem("projectLibrary")) || loadDefaultProjects(sampleProjects)
    pubsub.publish("createProjectElements", projectLibraryParsed)
}
pubsub.subscribe("relayStoredProjects", relayStoredProjects)

function loadDefaultTasks(arr) {
    setTaskLibrary(arr)
    return arr
}

function loadDefaultProjects(arr) {
    setProjectLibrary(arr)
    return arr
}