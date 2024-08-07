const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'nEELisagoodb$oy';


// ROUTE 1: CREATE A User using : POST "/api/auth/createuser". Doesn't require Authentication/ No login required
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors return BAD requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //   return res.status(400).json({success, errors: errors.array()});
        return res.status(400).json({ success, errors: "Email is not entered" });
    }

    try {
        // check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
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
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE 2: Authenticate A User using : POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password Cannot be blank!').exists(),
], async (req, res) => {
    let succes = false;
    // if there are errors return BAD requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: "Please try to login with correct credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: "Please try to login with correct credentials!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

});



// ROUTE 3: Get loggedin User Details : POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        // select everything with the user except the password
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Update password using : PUT "/api/auth/password". Requires Authentication
router.put('/forgot', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User with this email does not exist" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;


