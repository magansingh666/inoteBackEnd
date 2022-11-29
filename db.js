const mongoose = require('mongoose');
const pass = process.env.DBPASS;
const mongoUri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
const mongoUri2 = `mongodb+srv://msingh111:${pass}@cluster0.myt71op.mongodb.net/?retryWrites=true&w=majority`;
const connectToMongo = () => {
mongoose.connect(mongoUri2, ()=> {console.log("connected to mongo")})
};
module.exports = connectToMongo;

