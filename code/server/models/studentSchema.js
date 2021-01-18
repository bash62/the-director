const mongoose = require('mongoose');
const { Schema } = mongoose;


/**
 * Schema : studentSchema
 * 
 * name: Nom de l'élève
 * sex: Sex de l'élève
 * competence: Compétence de l'élève entre 0 et 1
 * effort: Effort de l'élève entre 0 et 1
 * speedComprehension: Vitesse de compréhention de l'élève entre 0 et 1
 * analysisSpeed: Vitesse d'analyse de l'élève entre 0 et 1
 * routinely: Routine de l'élève entre 0 et 1
 * answerAccuracy: Régulatité de l'élève entre 0 et 1
 * classAttendence: Attentivité de l'élève entre 0 et 1
 * focusness: Concentration de l'élèveentre 0 et 1
 * img: Image de la tête de l'élève
 * class: Classe de l'élève
 */
const studentSchema = new Schema({

    name: {type:String, required:true, unique:true},
    sex: {type:String, required:true},
    competence: {type:Number, required:true,min:0, max:1},
    effort: {type:Number, required:true,min:0, max:1},
    speedComprehension: {type:Number, required:true,min:0, max:1},
    analysisSpeed: {type:Number, required:true,min:0, max:1},
    routinely: {type:Number, required:true,min:0, max:1},
    answerAccuracy: {type:Number, required:true,min:0, max:1},
    classAttendence: {type:Number, required:true,min:0, max:1},
    focusness: {type:Number, required:true,min:0, max:1},
    img: String,
    class: String,
    
});


module.exports =  mongoose.model('students', studentSchema);

