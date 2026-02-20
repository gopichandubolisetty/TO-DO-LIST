const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;
app.use(cors());
// 3. Middleware: This allows our server to "understand" JSON data
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB successfully"))
.catch((err)=>console.error("Could not connect to MongoDB:",err));

const todoschema = new mongoose.Schema({
    task:{ type: String,required:true},
    completed:{type:Boolean,required:true}
});

const todo = mongoose.model('Todo',todoschema);

// When someone visits http://localhost:5000/, this function runs
app.get('/',(req,res)=>{
    res.send("Server is up and running");
});

// POST Route: Create a new Task
app.post('/add-task',async(req,res)=>{
    try{
        const newTask = new todo({
            task:req.body.task,
            completed:req.body.completed||false
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(error){
        res.status(400).json({message:"Error saving task",error:error.message});
    }
});

// GET Route: Fetch all Tasks
app.get('/get-tasks',async(req,res)=>{
    try{
        const allTasks = await todo.find({});
        res.status(200).json(allTasks);
    }catch(error){
        res.status(500).json({message:"Error fetching tasks",error:error.message});
    }
});

// PUT Route: Update a task (Mark as completed)
app.put('/update-task/:id',async(req,res)=>{
    try{
        const updateTask = await todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updateTask) return res.status(404).json({message:"Task not found",error:error.message});
        res.status(200).json(updateTask);
    }catch(error){
        res.status(400).json({message:"Error updating task",error:error.message});
    }
});

// DELETE Route: Remove a task
app.delete('/delete-task/:id',async(req,res)=>{
    try{
        const deleteTask = await todo.findByIdAndDelete(req.params.id);
        if(!deleteTask) return res.status(404).json({message:"Task not found"});

        res.status(200).json({message:"Task deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Error deleteing task",error:error.message});
    }
});


// Tell the server to start listening for requests
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
