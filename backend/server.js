const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

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

// Tell the server to start listening for requests

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});