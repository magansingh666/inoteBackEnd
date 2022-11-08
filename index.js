const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 5000;


app.use(express.json());

//available routes
app.use("/api/auth", require('./routes/auth.js'));
//app.use("/api/notes", require('./routes/notes.js'));

app.get('/', (req, res) => {
  res.send('Hello Worl dfdfdf  d!'); 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})