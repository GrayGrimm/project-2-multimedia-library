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
        type: String,
        enum: ['watched','read','played','listened', 'not yet'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    borrowable: {
        type: Boolean,
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;