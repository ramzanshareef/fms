const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const Donation = require("../models/Donation");
const myDateTime = require("../util/myDateTime");
const { isDonor } = require("../middlewares/isRole");

const dashboard = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                const donorID = req.session.userID;
                const numPendingDonations = await Donation.countDocuments({ donor: donorID, status: "pending" });
                const numAcceptedDonations = await Donation.countDocuments({ donor: donorID, status: "accepted" });
                const numAssignedDonations = await Donation.countDocuments({ donor: donorID, status: "assigned" });
                const numCollectedDonations = await Donation.countDocuments({ donor: donorID, status: "collected" });
                const numRejectedDonations = await Donation.countDocuments({ donor: donorID, status: "rejected" });
                const totalDonations = numPendingDonations + numAcceptedDonations + numAssignedDonations + numCollectedDonations + numRejectedDonations;    
                return res.status(200).json({
                    numPendingDonations,
                    numAcceptedDonations,
                    numAssignedDonations,
                    numCollectedDonations,
                    numRejectedDonations,
                    totalDonations
                });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const getDonations = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                const donorID = req.session.userID;
                const donor = await User.findById(donorID).select("-_id name");
                const donations = await Donation.find({ donor: donorID }).select("-_id -__v -donor");
                return res.status(200).json({ donor, donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const postDonation = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                const donorID = req.session.userID;
                const donor = await User.findById(donorID).select("-_id name");
                const donations = await Donation.find({ donor: donorID }).select("-_id -__v -donor");
                let { foodName, foodQuantity, cookingTime, address, donorToAdminMsg } = req.body;
                const donation = new Donation({
                    foodName,
                    foodQuantity,
                    cookingTime: myDateTime(cookingTime),
                    address,
                    donor: donorID,
                    status: "pending",
                    donorToAdminMsg
                });
                donations.push(donation);
                await donation.save();
                return res.status(200).json({ donor, donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const deleteDonation = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                const donorID = req.session.userID;
                const donationID = req.params.donationID;
                const donation = await Donation.findById(donationID);
                if (!donation) {
                    return res.status(404).json({ message: "Donation not found" });
                }
                await Donation.findByIdAndDelete(donationID);
                const donor = await User.findById(donorID).select("-_id name");
                const donations = await Donation.find({ donor: donorID }).select("-_id -__v -donor");
                return res.status(200).json({ donor, donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const updateDonation = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                const donorID = req.session.userID;
                const donationID = req.params.donationID;
                const donation = await Donation.findById(donationID);
                if (!donation) {
                    return res.status(404).json({ message: "Donation not found" });
                }
                const updateFields = {};
                if (req.body.foodName) {
                    updateFields.foodName = req.body.foodName;
                }
                if (req.body.foodQuantity) {
                    updateFields.foodQuantity = req.body.foodQuantity;
                }
                if (req.body.cookingTime) {
                    updateFields.cookingTime = req.body.cookingTime;
                }
                if (req.body.address) {
                    updateFields.address = req.body.address;
                }
                await Donation.findByIdAndUpdate(donationID, updateFields);
                const donor = await User.findById(donorID).select("-_id name");
                const donations = await Donation.find({ donor: donorID }).select("-_id -__v -donor");
                return res.status(200).json({ donor, donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}


module.exports = {
    dashboard,
    getDonations,
    postDonation,
    deleteDonation,
    updateDonation
}