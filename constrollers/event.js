const Event = require('../models/event');

// Create event
exports.createEvent = (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        location:{'lat': req.body.location.lat,'lng': req.body.location.lng},
        creator: req.userData.userId
        // participants: req.body.participants
    });
    console.log(event);
    event.save().then(createdEvent => {
        res.status(201).json({
            message: 'Event added successfully',
            eventId: createdEvent._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a post failed!'
        });
    });
}

exports.getEvent = (req, res, next) => {
    Event.findById(req.params.id).then(event => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Event not found!" });
      }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching event failed"
        });
    });;
  };

exports.updateEvent = (req, res, next) => {
    const event = new Event({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      location:{'lat': req.body.location.lat,'lng': req.body.location.lng},
      creator: req.userData.userId
    //   participants: req.body.participants
    });
    Event.updateOne(
      { _id: req.params.id, creator: req.userData.userId },
      event
    ).then(result => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't update event!"
        });
    });
  };

//   exports.updateEventParticipants = (req, res, next) => {
//     const event = new Event({
//       _id: req.body.id,
//       title: req.body.title,
//       description: req.body.description,
//       location:{'lat': req.body.location.lat,'lng': req.body.location.lng},
//       creator: req.userData.userId,
//       participants: req.body.participants
//     });
//     Event.updateOne(
//       { _id: req.params.id, creator: req.userData.userId, participants: req.body.participants },
//       event
//     ).then(result => {
//       console.log(event);
//       //console.log(result);
//       if (result.nModified > 0) {
//         res.status(200).json({ message: "Update successful!" });
//       } else {
//         res.status(401).json({ message: "Not authorized!" });
//       }
//     })
//     .catch(error => {
//         res.status(500).json({
//             message: "Couldn't update event!"
//         });
//     });
//   };

// Get all events
exports.getEvents =  (req, res, next) => {
    Event.find()
    .then(documents => {
        res.status(200).json({
            message: 'Events fetched succesfully',
            events: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching events failed"
        });
    });
}

// Delete event
exports.deleteEvent = (req, res, next) => {
    console.log("userData" + req.userData.userId);
    Event.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
        console.log(result);
        if (result.n > 0) {
            res.status(200).json({ message: "Deletion successfull" });
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Delete event failed"
        });
    });;
}