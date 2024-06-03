const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');


// CREATE A User using : POST "/api/auth". Doesn't require Authentication


router.post('/', [
    body('name', 'Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({min:5}),
] ,(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error: 'Email already exists!'})})
    
    // res.send(req.body);
})

module.exports = router;


