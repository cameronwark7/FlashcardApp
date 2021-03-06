import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Card from './models/card.js';
import Deck from './models/deck.js';
import User from './models/user.js'

const app = express();

app.use(cors());

// every route inside of postRoutes is going to start with /posts
app.use('/posts', postRoutes);

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


const CONNECTION_URL = 'mongodb+srv://cameronwark7:test123@cluster0.nkmnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// add card to deck
app.post('/api/v1/add-card', async (req, res) => {
    console.log(req.body);
    const card = {
        front: req.body.front,
        back: req.body.back
    }

    await Deck.updateOne({
        email: req.body.email, "decks.name": req.body.deckName
    }, {
        $push: {
            'decks.$.cards': card
        }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.delete('/api/v1/delete-card', async (req, res) => {
    console.log(req.body);

    await Deck.findOneAndUpdate({
        email: req.body.email,
        'decks.name': req.body.deckName
    }, {
        $pull: {
            'decks.$.cards': { front: req.body.card.front }
        }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

// add deck if name is unique
app.post('/api/v1/create-deck', async (req, res) => {
    console.log(req.body);

    const newDeck = {
        name: req.body.deckName,
        cards: []
    }

    await Deck.findOneAndUpdate({
        email: req.body.email // query
    }, {
        $addToSet: { // add it to the array only if unique
            decks: newDeck // put new deck in decks array
        }
    }, {
        upsert: true
    })
    .then((response) => {
        res.send(response);
    }).catch((error) => {
        console.log(error);
    })
});

app.post('/api/v1/update-deck', async (req, res) => {
    console.log(req.body);
    await Deck.findOneAndUpdate({
        email: req.body.email,
        'decks.name': req.body.deckName
    }, {
        'decks.$.cards': req.body.newCards
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.post('/api/v1/update-deck-name', async (req, res) => {
    console.log(req.body);

    await Deck.findOneAndUpdate({
        email: req.body.email,
        "decks.name": req.body.deckName
    }, {
        "decks.$.name": req.body.newDeckName
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.delete('/api/v1/delete-deck', async (req, res) => {
    console.log(req.body);

    await Deck.findOneAndUpdate({
        email: req.body.email
    }, {
        $pull: {
            decks: { name: req.body.deckName }
        }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });

});

app.get('/api/v1/get-cards', (req, res) => {

    // returns all cards
    Card.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// return a list of unique decks (alphabetecal order)
app.post('/api/v1/unique-decks', async (req, res) => {
    await Deck.find({ email: req.body.email })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

// endpoint for when the user tries to sign in with manual login.
app.post('/api/v1/user/signin', async (req, res) => {
    // destructure email and password sent from front end.
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // try finding existing user.
        const existingUser = await User.findOne({ email });

        // send 404 if user does not exist in the database. 
        if(!existingUser) return res.status(404).json({ message: "User does not exist." });

        // check if password sent is the same as when the user initially created the account.
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        // get the user's json web token to send to the front end. Uses 'test' as a secret and is set to expire in 1 hour.
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.log('error');
        res.status(500).json({ message: "Something went wrong." });
    }
});

// Endpoint for when user signs up using manual login. 
app.post('/api/v1/user/signup', async (req, res) => {
    // destructure data send from the front end.
    const { firstName, lastName, email, password, repeatPassword } = req.body;
    console.log(firstName, lastName, email, password, repeatPassword);

    try {
        // try to find if a user with the sent email already exists so that there are no issues with duplicate users.
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "A user with that email already exists." });

        // check if both passwords sent from the front end match.
        if(password !== repeatPassword) return res.status(400).json({ message: "Passwords do not match." });

        // hashing the password so that it is not stored as plain text.
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating a new user with data sent from front end. 
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        // create jwt token
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        // send the result and jwt token to front end. 
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});
