const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Upcoming Movies", "Latest Movies", "Now Playing"], required: true },
  image: { type: String, required: true }, // Store image URL or file path
  genre: { type: String, required: true },
  isDelete:{type: Boolean, default: false}
});
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
