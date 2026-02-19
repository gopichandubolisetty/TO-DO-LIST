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
      console.log("Error fetching tasks:",error);
    }
  };

  const addTask = async()=>{
    try{
      const reponse = await axios.post('http://localhost:5000/add-task',{
        task:input,
        completed:flase
      });
      setTasks([...tasks,response.data]);
      setInput("");
    }catch(error){
      console.log("Error adding task:",error);
    }
  };

  
  return(
    <div className="App">
      <h1>My MERN TO-Do List</h1>

      <div style={{marginBottom: '20px'}}>
        <input
        value={input}
        onchange={(e)=>setInput(e.target.value)}
        placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((item)=>(
          <li key={item.id}>
            {item.task}
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