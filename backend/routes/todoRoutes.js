const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/get-tasks',todoController.getTasks);
router.post('/add-Tasks',todoController.addTask);
router.put('/update-task/:id',todoController.updateTask);
router.delete('/delete-task/:id',todoController.deleteTask);

module.exports = router;