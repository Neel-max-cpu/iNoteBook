const mongoose = require('mongoose');
// for local -- testing 
const mongoURI = "mongodb://localhost:27017/inotebook"

// const mongoURI = "mongodb+srv://neelbhatta22:iNotebookpass@inotebook.56ofnwa.mongodb.net/"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
module.exports = connectToMongo;