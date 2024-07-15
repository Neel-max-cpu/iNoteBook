const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

// write to so that it doesn't give error while sending request
app.use(cors({
  origin: 'https://i-note-book-frontend-five.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json())
// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})
