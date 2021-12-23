import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    email: { type: String, required: true },
    decks: { type: [Object], required: true }
});

const Deck = mongoose.model('Deck', deckSchema);
export default Deck;
