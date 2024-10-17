const express = require('express');
require('dotenv').config();
const connection = require('./database/connection');
const cors = require('cors');

console.log('Connect Up Backend OK');
connection();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors({
    origin: '*',
    methods: 'POST, GET, UPDATE, PATCH, DELETE, HEAD',
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

//ROUTES

// const routes = require(.)
// app.use('/api/route')

app.listen(port, () => {
    console.log('MongoDB connected on', + port);
})

module.exports = app;