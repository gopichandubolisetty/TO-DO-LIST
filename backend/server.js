const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

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
app.get('/get-task',async(req,res)=>{
    try{
        const allTasks = await todo.find({});
        res.status(200).json(allTasks);
    }catch(error){
        res.status(500).json({message:"Error fetching tasks",error:error.message});
    }
});

// Tell the server to start listening for requests
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
