const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true, 
        unique: true,
    },
    password:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now,
    }
  });



  // can directly use this since unqiue email work not before it sometime didn't work
// module.exports = mongoose.model('user', UserSchema);

const User = mongoose.model('user', UserSchema);
module.exports = User;
