import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

const Deck = mongoose.model('Deck', deckSchema);
export default Deck;