const express = require("express");
const router = express.Router();
const { getAdminUser, editAdmin } = require("../controllers/userController");
const { dashboard, showAgents, assignAgent, showDonations, showRejectedDonations } = require("../controllers/adminController");

router.get("/", getAdminUser);
router.post("/edit", editAdmin);
router.get("/dashboard", dashboard);
router.get("/agents", showAgents);
router.post("/assign", assignAgent);
router.get("/rejected", showRejectedDonations);

module.exports = router;