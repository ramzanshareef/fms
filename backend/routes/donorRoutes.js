const express = require("express");
const router = express.Router();
const { getDonor, editDonor } = require("../controllers/userController");
const { dashboard, getDonations, postDonation, deleteDonation, updateDonation } = require("../controllers/donorController");

router.get("/", getDonor);
router.post("/edit", editDonor);
router.get("/dashboard", dashboard);
router.post("/donations", getDonations);
router.post("/donation", postDonation);
router.delete("/donation/:donationID", deleteDonation);
router.put("/donation/:donationID", updateDonation);

module.exports = router;