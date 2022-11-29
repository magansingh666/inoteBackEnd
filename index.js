const dotenv = require('dotenv');
dotenv.config();

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
let cors = require('cors');
const port = 5001;

app.use(cors());
app.use(express.json());

//available routes
app.use("/api/auth", require('./routes/auth.js'));
app.use("/api/note", require('./routes/note.js'));

app.get('/', (req, res) => {
  res.send('INOTE web app api...'); 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})