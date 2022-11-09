const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 5001;


app.use(express.json());

//available routes
app.use("/api/auth", require('./routes/auth.js'));
app.use("/api/note", require('./routes/note.js'));

app.get('/', (req, res) => {
  res.send('Hello Worl dfdfdf  d!'); 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})