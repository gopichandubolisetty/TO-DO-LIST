const Todo = require('../models/Todo');

exports.getTasks = async(req,res)=>{
    try{
        const Tasks = await Todo.find();
        res.status(200).json(Tasks)
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.addTasks = async(req,res)=>{
    try{
        const newTask = new Todo(req.body);
        const saved = await newTask.save();
        res.status(201).json(saved);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

exports.updateTask = async(req,res)=>{
    try{
        const updatedTask = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updatedTask) return res.status(404).json({message:"Task is not updated"});
        res.status(200).json(updatedTask);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.deleteTask = async(req,res)=>{
    try{
        const deletedTask = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTask) return res.status(404).json({message:"Task is not found"});
        res.status(200).json({message:"Task is delted"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};