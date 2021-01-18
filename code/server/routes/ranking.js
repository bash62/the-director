"use strict"
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const gameSchema = require('../models/gameSchema');

/**
 * Ranking : Renvoie le classement de @begin à @end occurences
 * Params : @begin : nombreDebut : Borne inférieur req.query.begin 0 - 20
 *          @end   : nombreFin   : envoi 
 */

router.route("/").get(async (req,res) =>{

    try{
        //Connection à la base de donnée
        mongoose.connect(process.env.URI_GAME, {useNewUrlParser: true, useUnifiedTopology: true});
        //Créer la liste de game
        let game_array = await gameSchema.find({}).sort({score: -1 });

        //Créer un objet map en récupérant le username, le score et l'id des games 
        let map = game_array.map(({username, score, _id}) => ({username,score: score[score.length -1],_id}));
        
        //Trie les games en fonctions du score
        map.sort(function(a, b) {
            if (a.score < b.score) {
              return 1;
            }
            if (a.score > b.score) {
              return -1;
            }
            return 0;
          });

        // vérifi que les arguments sont valide.
        if( req.query.begin === '' || req.query.end === '')
            res.status(401).json({message: "Erreur dans les arguments"});

        //Index de début et de fin
        let begin = parseInt(req.query.begin);
        let end = parseInt(req.query.end);

        //Vérifie la validité de end et begin
        if(end < begin || begin < 0 )
            res.status(401).json({message: "Erreur dans index"});
        
          
        let res_array = [];
        
        //Si on nous demande plus de games de games que se qu'il y en a
        if(end > map.length){
            //On envoie les envoies toute
            for(let i=begin;i<game_array.length;i++){
                res_array.push(map[i]);
            }

        }
        //Sinon on envoie les games entre begin et end
        else{
            for(let i=begin;i<end;i++){
                res_array.push(map[i]);
            }

        }
        
        res.status(200).json(res_array);
    }

    catch(error){

        throw new Error(error.stack);
    }



    
})
.post((req,res) => {
    res.status(401).json({message: "Erreur de requete"});

});

module.exports = router;