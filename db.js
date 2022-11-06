const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
const connectToMongo = () => {
mongoose.connect(mongoUri, ()=> {console.log("connected to mongo")})
};
module.exports = connectToMongo;

