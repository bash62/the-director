"use strict"
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const gameSchema = require('../models/gameSchema');
const score = require('../handlers/getScore'); 
const { gameNullValidator } = require('../validators/validation_schema');
require('dotenv').config();



/**
 * Route : endGame
 * 
 * Post :  Enregistre les informations de la partie dans une base de donnée
 *         Calcul le score
 *         Renvoie l'id de la partie enregistrer
 * 
 */
router.route("/").get((req,res) =>{
    res.status(401).json({message: "Mauvaise requete"});
})

.post(async (req,res) => {
    
    try {
        mongoose.connect(process.env.URI_GAME, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true});

        // On vérifie le schema


        if(req.body.username.length < 2 || req.body.username.length > 16 || !Array.from(req.body.username).some(char=>char.match(/[a-z]/)) || !/^([a-z0-9-])*$/.test(req.body.username)){
            res.status(500).json({message: "Username non valide !"});
        }


            //Récupère tous les élèves et créer un tableau utilisé dans le calcul de score

        let students = [];
        for(let i = 0; i<req.body.students.length;i++){
            
            students.push(req.body.students[i]);
        }

        /**
         *  fullGame : Schema de donnèes
         *  score(schema de donnèes a calculer, fullGame id pour enregistrer le score correspondant à cette partie.)
         *  Créer un schema de donnèes puis l'enregistre dans la bdd pour ensuite calculer le score() 
         */
        
        const fullGame = new gameSchema({   

            username: req.body.username,
            students: students,
            teacherA: req.body.teacherA,
            teacherB: req.body.teacherB,
            score: null,

        });

        await fullGame.save().then(console.log("Game enregistré"));
        

        score(fullGame,fullGame.id);

        res.status(200).json(fullGame.id);
    }

    catch (error) {
        throw new Error(error.stack);
    }
});

module.exports = router;