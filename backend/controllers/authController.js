const User = require("../models/User");
const { signupValidation } = require("../util/validation");
const { createHashedPassword, verifyHashedPassword, authenticateUser, destroyUser } = require("../util/authentication");
const isAuthenticated = require("../middlewares/isAuthenticated");

const signup = async (req, res) => {
    try {
        if (req.session.userID) {
            return res.status(201).json({ message: "Already Singed in" });
        }
        const result = await signupValidation(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        let user = await User.findOne({ email: req.body.email }).select("-password -__v -_id")
        if (user) {
            return res.status(409).json({ user, message: "Sorry, a user with this EMail already exists!" });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: createHashedPassword(req),
            role: req.body.role
        });
        return res.status(200).json({ message: "Signup Success!" });

    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error " + err.message });
    }
};

const login = async (req, res) => {
    const { email } = req.body;
    try {
        if (req.session.userID) {
            return res.status(200).json({ message: "Already logged in" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect Credentials" });
        }
        if (!verifyHashedPassword(req, user)) {
            return res.status(401).json({ message: "Incorrect Credentials" });
        }
        authenticateUser(req, user)
            .then(() => { return res.status(200).json({ message: "Login Success!" }) });
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error " + err.message });
    }
}

const logout = async (req, res) => {
    isAuthenticated(req, res, () => {
        try {
            destroyUser(req)
                .then(() => {
                    return res.status(200).json({ message: "Logout Success!" });
                })
        }
        catch (err) {
            return res.status(500).json({ error: "Internal Server Error " + err.message });
        }
    });
}

module.exports = { signup, login, logout };