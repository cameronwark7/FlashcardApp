const express = require('express');
const app = express();

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/', (req, res) => {

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
