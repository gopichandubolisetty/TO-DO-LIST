import React,{useState,useEffect} from 'react';
import TodoCard from './components/TodoCard';
import * as api from './services/api';

function App(){

// 1. Define 'tasks' as state and 'setTasks' to update it. Initial value is an empty array [].
  const [tasks,setTasks] = useState([]);
  const [input,setInput] = useState("");


// 2. This function runs when the component "mounts" (appears on screen)
  useEffect(()=>{
    loadTasks();
  },[]);

  const loadTasks = async()=>{
    try{
      const response = await api.fetchTasks();
      setTasks(response.data);
    }catch(error){
      console.error("Error fetching tasks:",error);
    }
  };

  const toggleComplete = async(id,currentStatus)=>{
    try{
      const response = await api.updateTask(id,{
        completed:!currentStatus
      });
      const updateTasks = tasks.map((task)=>task._id===id?response.data : task);
      setTasks(updateTasks);
    }catch(error){
      console.log("Error updating task:",error);
    }
  }
  const addTask = async()=>{
    if(!input) return;
    try{
      const response = await api.addTasks({
        task:input,
        completed:false
      });
      setTasks([...tasks,response.data]);
      setInput("");
    }catch(error){
      console.error("Error adding task:",error);
    }
  };

  const deleteTask = async(id)=>{
    try{
      await api.deleteTask(id);
      const updateTasks = tasks.filter((task)=> task._id!==id);
      setTasks(updateTasks);
    }catch(error){
      console.error("Error deleting task",error);
    }
  };




  return(
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
    <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Task Manager</h1>
    
    {/* Input Area */}
    <div className="flex gap-2 mb-8">
      <input 
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add
      </button>
    </div>

    {/* Task List using the Component */}
    <div className="space-y-2">
      {tasks.map((item) => (
        <TodoCard 
          key={item._id} 
          task={item.task} 
          completed={item.completed} 
          onToggle={() => toggleComplete(item._id, item.completed)}
          onDelete={() => deleteTask(item._id)}
        />
      ))}
    </div>
  </div>
</div>
  );

}

export default App;