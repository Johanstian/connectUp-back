const express = require('express');
require('dotenv').config();
const connection = require('./database/connection');
const cors = require('cors');


//DataBase con
connection();
const app = express();
const port = process.env.PORT || 3001;
app.use(cors({
    origin: '*',
    methods: 'POST, PUT, GET, PATCH, DELETE, HEAD',
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

//Configure use of JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Routes
const usersRoutes = require('./routes/usersRoutes')
const professionssRoutes = require('./routes/professionsRoutes')
app.use('/api/users', usersRoutes);
app.use('/api/professions', professionssRoutes);

//Listen PORT
app.listen(port, () => {
    console.log('MongoDB connected on', + port);
})

module.exports = app;