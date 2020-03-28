const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique:true
  },
  name: { type: String, required: true},
  lang: { type:Number, required: true},
  lat: {type: Number, required: true},
  description: {type:String}

})

const locationModel = mongoose.model('locations', locationSchema);
module.exports = locationModel;