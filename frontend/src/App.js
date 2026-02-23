import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App(){

// 1. Define 'tasks' as state and 'setTasks' to update it. Initial value is an empty array [].
  const [tasks,setTasks] = useState([]);
  const [input,setInput] = useState("");


// 2. This function runs when the component "mounts" (appears on screen)
  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/get-tasks');
      setTasks(response.data);
    }catch(error){
      console.error("Error fetching tasks:",error);
    }
  };

  const toggleComplete = async(id,currentStatus)=>{
    try{
      const response = await axios.put(`http://localhost:5000/update-task/${id}`,{
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
      const response = await axios.post('http://localhost:5000/add-task',{
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
      await axios.delete(`http://localhost:5000/delete-task/${id}`);
      const updateTasks = tasks.filter((task)=> task._id!==id);
      setTasks(updateTasks);
    }catch(error){
      console.error("Error deleting task",error);
    }
  };




  return(
    <div style={{padding:'40px' , fontFamily:'Arial'}}>
      <h1 className="text-3xl font-bold underline text-blue-600">
  Hello Tailwind!
</h1>

      <div style={{marginBottom: '20px'}}>
        <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Enter a new task..."
        />
        <button onClick={addTask} style={{padding:'10px',marginLeft:'5px',cursor:'pointer'}}>Add Task</button>
      </div>

      <ul style={{listStyle:'none',padding:0}}> 
        {tasks.map((item)=>(
          <li key={item._id} style={{
            marginBottom:'10px',
            textDecoration: item.completed ? 'line-through' : 'none',
            color:item.completed ? 'grey' : 'black'
            }}>
            <span style={{fontSize:'18px',cursor:'pointer'}} onClick={()=> toggleComplete(item._id,item.completed)} >
              {item.task}
            </span>
            <button onClick={() => deleteTask(item._id)} style={{margin:'10px'}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;