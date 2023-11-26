const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");
const Donation = require("../models/Donation");
const { isAdmin } = require("../middlewares/isRole");

const dashboard = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            try {
                const numPendingDonations = await Donation.countDocuments({ status: "pending" });
                const numAssignedDonations = await Donation.countDocuments({ status: "assigned" });
                const numAcceptedDonations = await Donation.countDocuments({ status: "accepted" });
                const numRejectedDonations = await Donation.countDocuments({ status: "rejected" });
                const numCollectedDonations = await Donation.countDocuments({ status: "collected" });
                const numTotalDonations = await Donation.countDocuments();
                return res.status(200).json({ numPendingDonations, numAssignedDonations, numAcceptedDonations, numRejectedDonations, numCollectedDonations, numTotalDonations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const showAgents = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            try {
                const agents = await User.find({ role: "agent" }).select("-_id name email");
                return res.status(200).json({ agents });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const assignAgent = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            try {
                const { donationID, agentID, adminToAgentMsg } = req.body;
                const donation = await Donation.findById(donationID);
                if (!donation) {
                    return res.status(404).json({ error: "Donation not found" });
                }
                const agent = await User.findById(agentID);
                if (!agent || agent.role !== "agent") {
                    return res.status(404).json({ error: "Agent not found" });
                }
                donation.agent = agentID;
                donation.status = "assigned";
                donation.adminToAgentMsg = adminToAgentMsg;
                await donation.save();
                return res.status(200).json({ message: "Agent assigned" });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const showRejectedDonations = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            try {
                const agentID = req.session.userID;
                const donations = await Donation.find({ status: "rejected" }).select("donor foodName status").populate("agent", "name email");
                return res.status(200).json({ donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}


module.exports = {
    dashboard,
    showAgents,
    assignAgent,
    showRejectedDonations
}