const express = require('express');
const app = express();

app.get('/api/v1/something', (req, res) => {
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
