const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectToMongo = () => {
    mongoose.connect(MONGO_URL).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
}

module.exports = {
    connectToMongo: connectToMongo
}