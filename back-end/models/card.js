import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    deck: {
        type: String,
        required: true
    }
}, { timestamps: true });

// will look for "Cards" collection
const Card = mongoose.model('Card', cardSchema);
module.exports = Card;

