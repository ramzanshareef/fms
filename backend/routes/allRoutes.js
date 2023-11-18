const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

const allRoutes = () => {
    router.use("/auth", authRoutes);
    router.use("/user", userRoutes);
    return router;
}

module.exports = {
    allRoutes
};