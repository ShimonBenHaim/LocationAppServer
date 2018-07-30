const express = require("express");
const notificationController = require("../constrollers/notification");

const router = express.Router();

router.post("/send", notificationController.sendNewsletter);
router.post("/add", notificationController.addPushSubscriber);


module.exports = router;
