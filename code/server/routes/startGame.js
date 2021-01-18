"use strict"
const express = require('express');
const router = express.Router();
const listEleve = require('../handlers/createStudent');

/**
 * Route : startGame
 * 
 * Get : Retourne une classe d'élève
 * 
 */
router.route("/").get((req,res) => { 
    res.status(200).json(listEleve());
})
.post((req,res) => {
    res.status(401).json({message: "Error: POST method is not available here."});
});


module.exports = router;