const express = require('express');
const app = express();

const routes = require('./routes');

const PORT = process.env.PORT || 5000;


// require db connection
require('./models');

// configure body parser for AJAX requests
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


app.use(express.static('client/build'));

app.use(routes);


// routes
app.get('/', (req, res) => {
  res.send('Hello from MERN App');
});

// Bootsrap server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});