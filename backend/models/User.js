const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["donor", "admin", "agent"]
    },
    gender: {
        type: String,
        enum: ["male","female"]
    },
    address: {
        type: String
    },
    phoneNo: {
        type: Number
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;