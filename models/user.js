const mongoose = require('mongoose')
const morgan = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'],
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    borrowable: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    director: {
        type: String,
    },
    realease_year: {
        type: Number,
    },
    runtime_minutes: {
        type: Number,
    },
    cast: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    movieLibrary: [movieSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;