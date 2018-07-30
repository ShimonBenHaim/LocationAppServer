const express = require("express");
const bodyParser = require("body-parser");

// Use the controller for clean code
const EventController = require("../constrollers/event");
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(bodyParser.json());

// Post Event
router.post("",
 checkAuth,
  EventController.createEvent);

  // Update Event
  router.put("/:id",
 checkAuth,
  EventController.updateEvent);
  
  // router.put("/updateEventParticipants",
  // checkAuth,
  //  EventController.updateEventParticipants);

  // Get single event
  router.get("/:id",
 EventController.getEvent);

 // Get all events
router.get("",
 EventController.getEvents);

 // Delete event
router.delete("/:id",
 checkAuth,
  EventController.deleteEvent);

module.exports = router;