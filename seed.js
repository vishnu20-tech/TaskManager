//import the monogoose
const mongoose=require('mongoose');
//import the taskmodel
const Task=require('./models/taskModel');

//create the seed of tasks
const tasks=[
    {
        title:"Learn DSA",
        description:"Learn the all the Basics  of DSA and pattern mastery",
        status:"in-process",
        priority:"High",
        dueDate:"20-06-2027",
        createdDate:"20-06-2025"
    },
     {
        title:"Learn WebDev",
        description:"Learn the all the Basics  of WebDev and build real projects",
        status:"in-process",
        priority:"High",
        dueDate:"20-06-2027",
        createdDate:"20-06-2025"
    },
     {
        title:"Learn  A Sport",
        description:"Learn a sport of like cricket,badminton,chess,tennis",
        status:"pending",
        priority:"Moderate",
        dueDate:"15-02-2027",
        createdDate:"2-06-2026"
    },
     {
        title:"Hit Gym",
        description:"Hit Gym about 5 days in week and build body,mindset",
        status:"pending",
        priority:"High",
        dueDate:"20-06-2027",
        createdDate:"20-06-2025"
    },
     {
        title:"Watch Movie on FDFS",
        description:"watch a bigmovie star movie on fdfs",
        status:"pending",
        priority:"Low",
        dueDate:"19-06-2026",
        createdDate:"20-03-2026"
    },
     {
        title:"Runnig EveryDay",
        description:"Run early in the morning about 2km on everyday",
        status:"completed",
        priority:"Moderate",
        dueDate:"18-12-2026",
        createdDate:"20-06-2026"
    }
]
///inert the seed into monogodb
mongoose.connect("mongodb://127.0.0.1:27017/taskManager")
    .then(async() => {
        console.log("MongoDB connected");
        //remove the exiting data
        await Task.deleteMany({});
        //add the seed data
        await Task.insertMany(tasks);
        console.log(Task);
        //close the connection of mongodb
        await mongoose.connection.close();
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });