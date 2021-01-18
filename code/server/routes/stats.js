"use strict"
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const gameSchema = require('../models/gameSchema');


/**
 * Route : stats 
 * 
 * Get : Retourne les stats associé à l'id de la game  
 * 
 */
router.get('/:id',async (req,res,next) =>{

    try{
        mongoose.connect(process.env.URI_GAME, {useNewUrlParser: true, useUnifiedTopology: true});
    
    }
    catch(error){
        throw new Error(error);
    }

    try {
        const {id} = req.params;
        const item = await gameSchema.findOne({
            _id: id 
        });


        if(!item) res.status(400).json({message: "id is not valide"});
        else{
            return res.json(item);
        }

    }
    catch(error){
        next(error);
    }

  
    res.status(200);
    
    
})

module.exports = router;