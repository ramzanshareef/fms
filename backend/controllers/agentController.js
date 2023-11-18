const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const Donation = require("../models/Donation");
const { isAgent } = require("../middlewares/isRole");

const dashboard = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            try {
                const agentID = req.session.userID;
                const numAcceptedDonations = await Donation.countDocuments({ agent: agentID, status: "accepted" });
                const numRejectedDonations = await Donation.countDocuments({ agent: agentID, status: "rejected" });
                const numCollectedDonations = await Donation.countDocuments({ agent: agentID, status: "collected" });
                const numAssignedDonations = await Donation.countDocuments({ agent: agentID, status: "assigned" }) + numAcceptedDonations + numRejectedDonations + numCollectedDonations;
                return res.status(200).json({ numAssignedDonations, numAcceptedDonations, numRejectedDonations, numCollectedDonations });
            }
            catch (err) {
                return res.status(500).json({ error: "Internal Server Error " + err.message });
            }
        });
    });
}

const showDonations = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            try {
                const agentID = req.session.userID;
                const donations = await Donation.find({ agent: agentID }).select("donor foodName status");
                return res.status(200).json({ donations });
            }
            catch (err) {
                return res.status(500).json({ error: "Internal Server Error " + err.message });
            }
        });
    });
}

const agentAcceptance = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            try {
                const agentID = req.session.userID;
                const { donationID, status } = req.body;
                const donation = await Donation.findOne({ _id: donationID, agent: agentID });
                if (!donation) {
                    return res.status(400).json({ message: "Donation not found" });
                }
                if (donation.status !== "assigned") {
                    return res.status(400).json({ message: "Donation already accepted or rejected or collected" });
                }
                donation.status = status;
                await donation.save();
                return res.status(200).json({ message: "Donation status updated" });
            }
            catch (err) {
                return res.status(500).json({ error: "Internal Server Error " + err.message });
            }
        });
    });
}

const collectDonation = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            try {
                const agentID = req.session.userID;
                const { donationID } = req.body;
                const donation = await Donation.findOne({ _id: donationID, agent: agentID });
                if (!donation) {
                    return res.status(400).json({ message: "Donation not found" });
                }
                if (donation.status !== "accepted" || donation.status === "collected") {
                    return res.status(400).json({ message: "Donation not accepted or donation collected" });
                }
                donation.status = "collected";
                await donation.save();
                return res.status(200).json({ message: "Donation collected" });
            }
            catch (err) {
                return res.status(500).json({ error: "Internal Server Error " + err.message });
            }
        });
    });
}

module.exports = {
    dashboard,
    showDonations,
    agentAcceptance,
    collectDonation
}