const express = require("express");
const router = express.Router();
const { getAgentUser, editAgent } = require("../controllers/userController");
const { dashboard, agentAcceptance, collectDonation, showDonations } = require("../controllers/agentController");

router.get("/", getAgentUser);
router.post("/edit", editAgent);
router.get("/dashboard", dashboard);
router.get("/donations", showDonations);
router.post("/donation", agentAcceptance);
router.post("/donation/collect", collectDonation);


module.exports = router;