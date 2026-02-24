const express = require('express');
const router = express.Router();

router.get('/test',(req,res)=> res.josn({message:"Route system is working"}));
module.exports = router;