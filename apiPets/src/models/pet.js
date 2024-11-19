// models/pet.js
const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    breed: {
        type: String
    },
    birthdate: {
        type: Date
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    temperament: {
        type: String
    },
    chipNumber: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    owners: [{ // Relación muchos a muchos con usuarios
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('Pet', petSchema);