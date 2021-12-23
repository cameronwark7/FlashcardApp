import mongoose from 'mongoose';

// schema used for creating a user to put into mongoDB database.
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    decks: {type: [Object], required: true }
    // id: { type: String }
});

export default mongoose.model('User', userSchema);
