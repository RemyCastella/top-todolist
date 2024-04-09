import { pubsub } from "./pubsub";

let ProjectID = 0

export default function createProjectObject({Title, Description}) {

ProjectID++

const projectObject = {

    ProjectID: ProjectID,
    Title: Title,
    Description: Description

}

pubsub.publish("newProject", projectObject)

}

pubsub.subscribe("newProjectInfo", createProjectObject)