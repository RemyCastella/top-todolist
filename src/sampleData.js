


export const sampleProjects = [
    {
        Title: "Learn Web Development",
        Description: "Study web development so that I am skilled enough to be employed as a web developer in 2025.",
        ProjectID: 1
    },
    {
        Title: "Chores",
        Description: "All this studying and the dishes keep piling up. Do the chores!",
        ProjectID: 2
    }
]

export const sampleTasks = [
    {
        Title: "Learn HTML",
        Description: "Go through the HTML sections of the Odin Project" ,
        Due: "2024-04-05",
        Important: true,
        ProjectID: sampleProjects[0].ProjectID,
        TaskID: 1,
        Complete: false
    },
    {
        Title: "Learn CSS",
        Description: "Go through the CSS sections of the Odin Project" ,
        Due: "2024-04-10" ,
        Important: true,
        ProjectID: sampleProjects[0].ProjectID,
        TaskID: 2,
        Complete: false
    },
    {
        Title: "Learn Vanilla JavaScript",
        Description: "Go through the JS section of the Odin Project",
        Due: "2024-08-21",
        Important: true,
        ProjectID: sampleProjects[0].ProjectID,
        TaskID: 3,
        Complete: false
    },
    {
        Title: "Learn React",
        Description: "Go through the React section of the Odin Project",
        Due: "2024-08-21",
        Important: true,
        ProjectID: sampleProjects[0].ProjectID,
        TaskID: 4,
        Complete: false
    },
    {
        Title: "Do the dishes",
        Description: "They arern't gonna wash themselves...",
        Due: "2024-04-05",
        Important: false,
        ProjectID: sampleProjects[1].ProjectID,
        TaskID: 5,
        Complete: false
    },
    {
        Title: "Do the laundry",
        Description: "",
        Due: "2024-04-08",
        Important: false,
        ProjectID: sampleProjects[1].ProjectID,
        TaskID: 6,
        Complete: true
    }
]