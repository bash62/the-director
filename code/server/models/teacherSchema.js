const mongoose = require('mongoose');
const { Schema } = mongoose;


/**
 * Schema : teacherSchema
 * 
 * name: Nom du professeur
 * sex: Sex du professeur
 * anneeEtude : Année d'étude du professeur
 * age : Age du professeur
 * experience : Nombre d'année qu'il pratique le job de professeur
 * jugementCompetence : Jugement des compétence des l'élèves soit 0 soit 1
 * jugementEffort : Jugement des efforts des l'élèves soit 0 soit 1
 * description : Description du professeur
 * img: Image de la tête de l'élève
 * class: Classe de l'élève
 */
const teacherSchema = new Schema({
    name : { type: String, required: true, unique:true },
    sex : { type: String, required: true },
    anneeEtude : { type: Number, required: true }, 
    age : { type: Number, min:0, max:70, required: true },
    experience : { type: Number, required: true }, 
    jugementCompetence : {type: Number, min:0, max:1, required: true },
    jugementEffort : {type: Number, min:0, max:1, required: true }, 
    description : {type: String},
    img: String,
    class: String,
});


module.exports =  mongoose.model('teacher', teacherSchema);