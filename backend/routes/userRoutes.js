const express = require("express");
const router = express.Router();
const donorRoutes = require("./donorRoutes");
const adminRoutes = require("./adminRoutes");
const agentRoutes = require("./agentRoutes");

router.use("/donor", donorRoutes);
router.use("/admin", adminRoutes);
router.use("/agent", agentRoutes);

module.exports = router;