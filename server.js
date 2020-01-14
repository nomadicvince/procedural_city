const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.listen(3000, () => console.log(`App is listening on port ${port}!`));
