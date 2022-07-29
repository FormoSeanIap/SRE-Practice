require('dotenv').config();

// Express Initialization
const express = require('express');
const http = require('http');

const {
    PORT_TEST, PORT, NODE_ENV, API_VERSION,
} = process.env;
const port = NODE_ENV === 'test' ? PORT_TEST : PORT;
const app = express();
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${API_VERSION}/user`, require('./server/routes/user'));

// Page not found
app.use((req, res) => {
    // res.status(404).sendFile(__dirname + '/public/404.html');
    res.status(404).send('page not found');
});

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

server.listen(port, () => console.log(`Listening on port ${port} in ${NODE_ENV} mode`));

module.exports = app;