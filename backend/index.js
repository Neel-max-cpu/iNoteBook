const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = process.env.PORT || 5000

app.use(cors());

// write to so that it doesn't give error while sending request
// CORS options
// const corsOptions = {
//   origin: ['https://i-note-book-frontend-five.vercel.app'], // Your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
//   credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

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


app.use(express.json())

// default
app.get("/", (req, res) => {
  res.send("Hello World" )
})

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})
