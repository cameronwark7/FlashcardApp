import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import Card from './models/card.js';

const app = express();

app.use(cors());

// every route inside of postRoutes is going to start with /posts
app.use('/posts', postRoutes);

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


const CONNECTION_URL = 'mongodb+srv://flashcard-app:flashcard-app123@cluster0.rkik8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// endpoint to add card to deck
app.post('/api/v1/add-card', (req, res) => {
    const card = new Card({
        front: req.body.front,
        back: req.body.back,
        deck: req.body.deck
    });

    card.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

// return all cards
app.get('/api/v1/get-cards', (req, res) => {
    Card.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

