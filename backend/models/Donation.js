const mongoose = require("mongoose");
const moment = require("moment")

const DonationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    foodName: {
        type: String,
        required: true
    },
    foodQuantity: {
        type: Number,
        required: true
    },
    cookingTime: {
        type: String,
        required: true,
    },
    collectingTime: {
        type: Date
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "assigned", "accepted", "rejected", "collected"],
        required: true
    },
    donorToAdminMsg: {
        type: String
    },
    adminToAgentMsg: {
        type: String
    }
});

const Donation = mongoose.model("donation", DonationSchema);
module.exports = Donation;