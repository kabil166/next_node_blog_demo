//routes/user.js
const express = require('express');
const router = express.Router();


router.get('/profile',async (req,res)=>{

    const user = req.user   
    res.send(user);

})


module.exports = router;