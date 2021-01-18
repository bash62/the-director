"use strict"
const mongoose = require("mongoose");
const scoreSchema = require('../models/scoreSchema');
const gameSchema = require('../models/gameSchema');
const { scoreValidator } = require('../validators/validation_schema');

/**
 * Se connect à la base pour sauvegarder le score corresponant à l'id de la partie.
 * 
 * async saveinDB() :
 *      obj : score[] : Tableau de score générer en fonction des choix du joueur
 *      gameId : String : id de la Game
 * 
 *      Enregistre un score lié à son identifiant (_id) puis récupère la partie correspondante pour mettre à jour son tableau de score et le sauvegarder.
 *      
 */

async function saveinDb(obj,gameId){
    try {

        const item = await gameSchema.findOneAndUpdate({_id: gameId},{score: obj},{
            returnOriginal: false
          });



        if(!item) res.json({message: "Rien trouvé ici."});

        // Si on retrouve l'object item alors on update son score avec le score calculer.

    }
    catch (error) {
        throw new Error(error.stack);

    }

}

function getAverage(anneeEtude,jugementCompetence,jugementEffort,student_score_comp,student_score_effort){
    let res
    let pourcentComp;
    let pourcentEffort;
    anneeEtude=(anneeEtude-3)/5;
    //Influence du score de l'élève en fonction de son type de jugement
    if(jugementCompetence==1 && jugementEffort==1){ //Valorise les compétences et les efforts
        pourcentComp=0.5+0.1*anneeEtude; //Plus ya d'annee d'études plus le prof juge
        pourcentEffort=0.5+0.1*anneeEtude;
    }
    else if(jugementCompetence==0 && jugementEffort==1){ //juge les efforts
        pourcentComp=0.5-0.2*anneeEtude;
        pourcentEffort=0.5+0.2*anneeEtude;
    }
    else if(jugementCompetence==1 && jugementEffort==0){ //juge les compétences
        pourcentComp=0.5+0.2*anneeEtude;
        pourcentEffort=0.5-0.2*anneeEtude;
    }
    else{ //Ne valorise rien
        pourcentComp=0.5;
        pourcentEffort=0.5;  
    }
    res = ((student_score_comp-0.5)*pourcentComp) + ((student_score_effort-0.5)*pourcentEffort);
    return res;
}

module.exports = function getScore(req, gameId){

    //Jugements du prof soit 0 ou 1
    let facteur_profA_competence = req.teacherA.jugementCompetence;
    let facteur_profA_effort= req.teacherA.jugementEffort;
    let facteur_profB_competence = req.teacherB.jugementCompetence;
    let facteur_profB_effort= req.teacherB.jugementEffort;

    //Année d'étude du professeur
    let profA_anneeEtude=req.teacherA.anneeEtude;
    let profB_anneeEtude=req.teacherB.anneeEtude;

    //Tableau qui stock les score de tout les élèves d'une classe
    let scoreA = [];
    let scoreB = [];

    //Tableau du score évoluent au cours des ajouts des élèves
    let scoreFinal = [];

    //Moyenne des scores de chaque classe
    let score_round_a = 0;
    let score_round_b = 0;

    //Nombre d'élève dans la classe
    let nb_eleve_a = 0;
    let nb_eleve_b = 0;

    for(let i=0;i<req.students.length;i++){
        let student_score_comp; //Compétence de l'élève
        let student_score_effort; //Effort de l'élève
        let student = req.students[i]; //élève en question
    

        //Calcul des compétences et des efforts
        student_score_comp = (student.speedComprehension + student.analysisSpeed + student.answerAccuracy) / 3;
        student_score_effort =(student.routinely + student.classAttendence + student.focusness)/3;

        let student_score_average_A=getAverage(profA_anneeEtude,facteur_profA_competence,facteur_profA_effort,student_score_comp,student_score_effort);
        let student_score_average_B=getAverage(profB_anneeEtude,facteur_profB_competence,facteur_profB_effort,student_score_comp,student_score_effort);

        if(student_score_average_A>student_score_average_B){
            if(student.class == "A"){
                scoreA.push(1);
            }
            if(student.class == "B"){
                scoreB.push(0);
            }
        }
        else if(student_score_average_A<student_score_average_B){
            if(student.class == "A"){
                scoreA.push(0);
            }
            if(student.class == "B"){
                scoreB.push(1);
            }
        }
        else{
            if(student.class == "A"){
                scoreA.push(0.5);
            }
            if(student.class == "B"){
                scoreB.push(0.5);
            }
        }

        


        if(student.class == "A"){ 
            nb_eleve_a++;           
            score_round_a=0; //reinitialise le score du round de la classe A
            for(let a = 0;a<scoreA.length;a++){
                score_round_a += scoreA[a]*(1/scoreA.length); //calcul du score du round de la classe A
            }
        }

        else if(student.class == "B"){
            nb_eleve_b++;
            score_round_b=0; //reinitialise le score du round de la classe B
            for(let a = 0;a<scoreB.length;a++){
                score_round_b += scoreB[a]*(1/scoreB.length); //calcul du score du round de la classe B
            }
        }
        else{
            console.log("undef");
        }
        
        //Met dans le tableau de score final la moyenne des scores de chaque classe
        if(nb_eleve_a===0){
            scoreFinal.push( score_round_b); 
        }
        else if(nb_eleve_b===0){
            scoreFinal.push(score_round_a); 
        }
        else{
            scoreFinal.push((score_round_a + score_round_b) / 2); 
        }
    }
    //Sauvegarde un tableau de tout les score à chaque ajout d'utilisateur et la gameID
    saveinDb(scoreFinal,gameId);

    return scoreFinal;

}