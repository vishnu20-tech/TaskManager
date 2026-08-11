//import the express
const express=require('express');
const app=express();
//import the ejs
const path = require("path");
app.set("view engine","ejs");
//import the ejs mate for styling
const ejsMate=require('ejs-mate');
app.set("views",path.join(__dirname,'views'));
///import the method - Override to perfom -> update and delete
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//import the mongoose
const mongoose=require('mongoose');
const Task=require('./models/taskModel');
app.use(express.urlencoded({ extended: true }));
app.engine("ejs",ejsMate);
//use the json
app.use(express.json());
//import and connect mongodb
mongoose.connect("mongodb://127.0.0.1:27017/taskManager")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


//Route -> get the all the tasks
app.get('/tasks',async(req,res)=>{
    const tasks=await Task.find({});
    res.render('tasks',{ tasks });
})


//Route -> to post the new tasks
//Render the HTML page to post -> task
app.get('/tasks/new',(req,res)=>{
    res.render('new');
})
//add the post Route -> submit info to tasks
app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body);
    await task.save();
    res.redirect('/tasks')
})



//Route to show the -> Completed Tasks
app.get('/tasks/completed',async(req,res)=>{
    const tasks=await Task.find({status:"completed"});
    res.render('completed',{ tasks });
})


//Route to show -> pending tasks
app.get('/tasks/pending',async(req,res)=>{
    const tasks=await Task.find({status:"pending"});
    res.render('pending',{ tasks });
})



//Route -> Update the task
app.get('/tasks/:id/edit',async(req,res)=>{
    const task=await Task.findById(req.params.id);
    res.render('edit',{ task });
})
//Update the task with newer Info
app.put('/tasks/:id',async(req,res)=>{
    const { id }=req.params;
    await Task.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect('/tasks');
})


///Route -> to delete the task
app.delete('/tasks/:id',async(req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
})



//Route -> get the task by id
app.get('/tasks/:id',async(req,res)=>{
    const task=await Task.findById(req.params.id);
    res.render('show',{ task });
})




//start the server
app.listen(3000,(req,res)=>{
    console.log("Server Running at the Port:3000");
})