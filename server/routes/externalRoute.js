const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/vancouver", (req, res) => {
  const category = req.query.category || 'drinking-fountains';
  axios.get(`https://opendata.vancouver.ca/api/records/1.0/search/?dataset=${category}&facet=in_operation&facet=pet_friendly&facet=geo_local_area`)
    .then(response => {
      res.send(response.data.records.map(x => ({
        recordid: x.recordid,
        name: x.fields.name,
        mapid: x.fields.mapid,
        lat: x.fields.geom.coordinates[1],
        lng: x.fields.geom.coordinates[0],
        location: x.fields.location,
        maintainer: x.fields.maintainer,
        in_operation: x.fields.in_operation,
        geo_local_area: x.fields.geo_local_area,
        record_timestamp: x.fields.record_timestamp,
      })))
    })
    .catch(err => res.status(500).send("Error in connectiong vancouver.ca"))
});

module.exports = router;