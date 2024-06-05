const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'nEELisagoodb$oy';


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

    try {    
        // check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Email already exists!'})})
        
        // res.send(req.body);

        // send this or ---
        // res.json({"Success": "user has been created!"})
        // or this---
        // res.json({user})


        // send now this , jwt token
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports = router;


