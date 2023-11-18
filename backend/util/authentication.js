const bcrypt = require("bcryptjs");
const myDateTime = require("./myDateTime");

const createHashedPassword = (req) => {
    let salt = bcrypt.genSaltSync(10);
    let secPass = bcrypt.hashSync(req.body.password, salt);
    return secPass;
}

const verifyHashedPassword = (req, user) => {
    const comparePass = bcrypt.compareSync(req.body.password, user.password);
    return comparePass;
}

const authenticateUser = (req, user) => {
    const { id, role } = user;
    const roles = ["donor", "admin", "agent"];
    req.session.userID = id;
    req.session.loginTime = myDateTime(new Date());
    req.session.isAuthenticated = true;
    roles.forEach((r) => {
        req.session[`is${r.charAt(0).toUpperCase()}${r.slice(1)}`] = (role === r? true: false);
    });
    req.session.save();
    return Promise.resolve();
}

const destroyUser = (req) => {
    req.session.isAuthenticated = false;
    req.session.destroy();
    return Promise.resolve();
}

module.exports = {
    createHashedPassword,
    verifyHashedPassword,
    authenticateUser,
    destroyUser,
};