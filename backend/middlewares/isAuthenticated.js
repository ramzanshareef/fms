const { destroyUser } = require("../util/authentication");

const isAuthenticated = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        destroyUser(req)
            .then(() => {
                return res.status(401).json({ message: "Please Login to continue!" });
            })
    }
    else {
        next();
        return;
    }
}

module.exports = isAuthenticated;