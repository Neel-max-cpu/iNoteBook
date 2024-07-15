const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

// app.use(cors());

// write to so that it doesn't give error while sending request
// CORS configuration is important
// const corsOptions = {
//   origin: ['https://i-note-book-frontend-five.vercel.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// Use CORS middleware with options
// app.use(cors(corsOptions));
app.use(cors(
  {
    origin: ["https://i-note-book-frontend-five.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    credentials: true,
    optionsSuccessStatus: 200,
  } 
));

// Explicitly handle preflight requests
// app.options('*', cors(corsOptions));

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ data: "hello" })
})

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})
