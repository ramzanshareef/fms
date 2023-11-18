const { body, validationResult } = require("express-validator");

const signupValidation = async (req)=>{
    const validationArray = [
        body("name", "Enter a Valid Name").isLength({ min: 5 }),
        body("email", "Enter a Valid Email").isEmail(),
        body("password", "Enter a Valid Password").isLength({ min: 5 }),
        body("role", "Enter a Valid Role").isIn(["donor", "admin", "agent"])
    ];
    await Promise.all(validationArray.map(validation => validation.run(req)));
    return validationResult(req);
}

module.exports = {
    signupValidation
}