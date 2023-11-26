const User = require("../models/User");
const Donation = require("../models/Donation");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { isDonor, isAdmin, isAgent } = require("../middlewares/isRole");

const getDonor = (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            try {
                let donorID = req.session.userID;
                let donor = await User.findById(donorID).select("-password -__v -_id");
                let donations = await Donation.find({ donor: donorID }).select("-_id -__v -donor");
                return res.status(200).json({ donor, donations });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const getAdminUser = (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            try {
                let adminID = req.session.userID;
                let admin = await User.findById(adminID).select("-password -__v -_id");
                return res.status(200).json({ admin });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const getAgentUser = (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            try {
                let agentID = req.session.userID;
                let agent = await User.findById(agentID).select("-password -__v -_id");
                return res.status(200).json({ agent });
            }
            catch (err) {
                return res.status(500).json({ message: "Internal Server Error " + err.message });
            }
        });
    });
}

const editUser = async (req, res) => {
    try {
        const userID = req.session.userID;
        const updateFields = {};
        if (req.body.name) {
            updateFields.name = req.body.name;
        }
        if (req.body.email) {
            updateFields.email = req.body.email;
        }
        if (req.body.gender) {
            updateFields.gender = req.body.gender;
        }
        if (req.body.address) {
            updateFields.address = req.body.address;
        }
        if (req.body.phoneNo) {
            updateFields.phoneNo = req.body.phoneNo;
        }
        await User.findByIdAndUpdate(userID, updateFields);
        const user = await User.findById(userID).select("-_id -password -__v");
        return res.status(200).json({ donor: user });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error " + err.message });
    }
}

const editDonor = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isDonor(req, res, async () => {
            editUser(req, res);
        });
    });
}
const editAdmin = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAdmin(req, res, async () => {
            editUser(req, res);
        });
    });
}
const editAgent = async (req, res) => {
    isAuthenticated(req, res, async () => {
        isAgent(req, res, async () => {
            editUser(req, res);
        });
    });
}

module.exports = { getDonor, getAdminUser, getAgentUser, editDonor, editAdmin, editAgent };