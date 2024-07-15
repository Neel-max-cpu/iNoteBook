const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const allowCors = require('./corsMiddleware'); // Import the custom CORS middleware

connectToMongo();

const app = express()
const port = 5000

app.use(cors());

// write to so that it doesn't give error while sending request
// CORS options
const corsOptions = {
  origin: 'https://i-note-book-frontend-five.vercel.app', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware with options
// app.use(cors(corsOptions));

// Explicitly handle preflight requests
// app.options('*', cors(corsOptions));

// app.use(cors(
//   {
//     origin: ["https://i-note-book-frontend-five.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   }
// ));


// use the custom cors this time ---
// app.use(allowCors((req, res, next) => {
//   next();
// }));


app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello")
})

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})
