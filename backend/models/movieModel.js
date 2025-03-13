const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    price: Number,
    posterUrl: String,
    releaseDate: {
        type: Date,
        required: true
    },
    nowPlaying: { type: Boolean, default: false }, // ✅ Indicates if it's now playing
    upcoming: { type: Boolean, default: false } // ✅ Only admins can set this
});


const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
