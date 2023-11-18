const { destroyUser } = require("../util/authentication");

const isAgent = (req, res, next) => {
    if (!req.session.isAgent) {
        destroyUser(req)
            .then(() => {
                return res.status(401).json({ message: "Please Login as an Agent!" });
            })
    }
    else {
        next();
        return;
    }
}

const isAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
        destroyUser(req)
            .then(() => {
                return res.status(401).json({ message: "Please Login as an Admin!" });
            })
    }
    else {
        next();
        return;
    }
}

const isDonor = (req, res, next) => {
    if (!req.session.isDonor) {
        destroyUser(req)
            .then(() => {
                return res.status(401).json({ message: "Please Login as a Donor!" });
            })
    }
    else {
        next();
        return;
    }
}

module.exports = {
    isDonor,
    isAdmin,
    isAgent
};