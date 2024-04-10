import { pubsub } from "./pubsub";

function relayStoredTasks() {

    const taskLibraryParsed = JSON.parse(localStorage.getItem("taskLibrary"))
    const activeTaskGroup = document.querySelector(".active")

    if (activeTaskGroup.classList.contains("project")){
        pubsub.publish("filterTasksByProject", taskLibraryParsed)
    } else {
        pubsub.publish("filterTasksByTaskGroup", taskLibraryParsed)
    }

}

pubsub.subscribe("relayStoredTasks", relayStoredTasks)