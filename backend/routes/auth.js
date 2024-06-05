const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');


// CREATE A User using : POST "/api/auth/createuser". Doesn't require Authentication/ No login required


router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({min:5}),
] ,async (req, res)=>{
    // if there are errors return BAD requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {    
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"});
        }
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Email already exists!'})})
        
        // res.send(req.body);

        // send this or ---
        // res.json({"Success": "user has been created!"})
        res.json({user})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports = router;


