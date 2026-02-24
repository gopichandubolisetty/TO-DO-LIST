const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:{type:String,required:true},
    completed:{type:boolean,default:false},
},{timestamp:true});

module.exports = mongoose.model('Todo',todoSchema);