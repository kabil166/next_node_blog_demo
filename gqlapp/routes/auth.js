const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const bcrypt = require('bcrypt');
const fs = require('fs');
const crypto = require('crypto');

const publicKey = fs.readFileSync('public.key', 'utf8');

function encryptToken(token) {
    const buffer = Buffer.from(token, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

router.post('/user/login', async (req, res) => {
    
    const input = req.body;
    const {email, password} = input
    
    const user = await User.findOne({ where: { email: email }});
    if(!user){
      return res.status(400).json({message:"User not found!"})
    }
    const userData = await user.dataValues;

    const verifyPassword =await bcrypt.compare( password, userData.password);
   
    if(!verifyPassword){
        return res.status(400).json({message:"Invalid Credentials!"})
    }else{
        const payload = {
            id: userData.id,
            email: userData.email
        }
        const token = jwt.sign(payload, config.jwtSecret,{ expiresIn: '1d'});
        const encryptedToken =encryptToken(token);
  
        res.status(200).json({auth_token:"Bearer "+ encryptedToken, message:"User logged in successfully!"});
    }
   
  });

module.exports = router;