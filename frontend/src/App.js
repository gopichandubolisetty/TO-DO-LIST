import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App(){

// 1. Define 'tasks' as state and 'setTasks' to update it. Initial value is an empty array [].
  const [tasks,setTasks] = useState([]);
  

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

  
  return(
    <div className="App">
      <h1>My MERN TO-Do List</h1>
      <ul>
        {tasks.map((item)=>(
          <li key={item.id}>
            {item.task} - {item.completed ? "✅ Done" : "❌ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;