import { pubsub } from "./pubsub"

let TaskID = 0

export default function createTask({Title, Description, Due, Important, ProjectID, Complete}) {

    TaskID++

    const taskObj = {
        ProjectID,
        TaskID,
        Title,
        Description,
        Due,
        Important,
        Complete
    }

    pubsub.publish("newTask", taskObj)

}

pubsub.subscribe("newTaskInfo", createTask)
