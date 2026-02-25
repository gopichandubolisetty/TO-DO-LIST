import axios from 'axios';

const API = axios.create({
    baseURL:'http://localhost:5000/api'
});

export const fetchTasks = ()=> API.get('/get-tasks');
export const addTasks = (taskData)=> API.post('/add-task',taskData);
export const updateTask = (id,updatedData)=>API.put(`/update-task/${id}`,updatedData);
export const deleteTask = (id)=> API.delete(`/delete-task/${id}`);

export default API;