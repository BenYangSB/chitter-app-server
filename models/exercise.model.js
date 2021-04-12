const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
  username: { type: String, required: true },
  userKey: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  ingredients: { type: Array, required: true },
  image: { type: String, required: true },
  totalRating: {type: Number, required: true},
  numRatings: {type: Number, required: true}
  
}, {
  timestamps: true,
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;