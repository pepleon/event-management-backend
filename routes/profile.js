const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/profile',async (req,res) => {

    try{

 const userId = req.user;       

const data = await User.findById(userId);


res.send(data);





    }
catch(err){
    console.log(err.message);
}


})



module.exports = router;