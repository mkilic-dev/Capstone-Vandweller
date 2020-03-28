const express = require("express");
const helper = require("../helper/helper");
const locationFile = __dirname + "/../models/locations.json";
const locations = require(locationFile);

const router = express.Router();

router.post("/", (req, res) => {
  const newLocation = {
    _id: helper.getNewId(),
    name: req.body.name,
    lng: req.body.lng,
    lat: req.body.lat,
    description: req.body.description
  };
  locations.push(newLocation);
  if (helper.writeJSONFile(locationFile, locations)) {
    res.send({ success: true, message: "Location created successfully" });
  } else {
    res.status(500).send({ error: true, message: "Error in creating location." });
  }
});

router.get("/", (req, res) => {
  res.send(locations);
});

router.delete("/:id", (req, res) => {
  const toDeleteLocation = locations.find(x => x._id === req.params.id);
  if (toDeleteLocation) {
    locations.splice(locations.indexOf(toDeleteLocation), 1);
    if (helper.writeJSONFile(locationFile, locations)) {
      res.send({ success: true, message: "Successfully Deleted." });
    } else {
      res.status(500).send({ error: true, message: "Error in deleting location." })
    }
    // save array in file
  } else {
    res.status(404).send({ message: "Location Not Found", error: true });
  }
});

module.exports = router;