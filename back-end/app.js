const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// endpoint to add card to deck
app.post('/api/v1/add-card', (req, res) => {
    console.log(req.body);
});

app.get('/api/v1/', (req, res) => {
    // get request
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
