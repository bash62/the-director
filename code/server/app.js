const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

// Les routes vers l'api

const startGame = require('./routes/startGame');
const endGame = require('./routes/endGame');
const ranking = require('./routes/ranking');
const stats = require('./routes/stats');


const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());



app.use("/startGame",startGame);
app.use("/endGame",endGame);
app.use("/ranking",ranking);
app.use("/stats",stats);




//Error handler
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({ message: 'Server Error'});
})

app.listen(port, () => {
  console.log('Listening on port '+port+' ...');
})
