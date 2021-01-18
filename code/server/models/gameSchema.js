const mongoose = require('mongoose');
const { Schema } = mongoose;
const studentSchema = require('./studentSchema');
const teacherSchema = require('./teacherSchema');

/**
 * Schema : gameSchema
 * 
 * username: Nom de l'utilisateur
 * date: Date de début de jeu
 * students: Classe d'éléve
 * teacherA: Prof A
 * teacherB: Prof B
 * score: Score de la game
 */
const gameSchema = new Schema({

    username: {type: String, required: true},
    date:{type: Date, default:Date.now()},
    students: {type: [Schema.Types.Mixed]},
    teacherA: {type: Schema.Types.Mixed},
    teacherB: {type: Schema.Types.Mixed},
    score: {type: [Number]},

});


module.exports =  mongoose.model('game', gameSchema);