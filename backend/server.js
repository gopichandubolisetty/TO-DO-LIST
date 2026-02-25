const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const PORT = 5000;
app.use(cors());
// 3. Middleware: This allows our server to "understand" JSON data
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB successfully"))
.catch((err)=>console.error("Could not connect to MongoDB:",err));

// When someone visits http://localhost:5000/, this function runs
app/use('/api',todoRoutes);

// Tell the server to start listening for requests
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
