const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema : scoreSchema
 * 
 * gameId: Id de la game
 * score: Score de la game
 */
const scoreSchema = new Schema({
    gameId : {type : mongoose.ObjectId, required:true },
    score : {type : [Number] },
});


module.exports =  mongoose.model('score', scoreSchema);