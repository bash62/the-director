const studentSchema = require('../models/studentSchema');
const STUDENTS  = require('./name_list.js');
const AVATAR  = require('./student_avatar_list.js');
const listNomUtilise = STUDENTS;
const teacher = require('./createTeacher');

/**
 * Retourne un lien d'un avatar aléatoire pour un élève en fonction du sex
 * 
 * param
 *      sex: sexe de l'élève
 * 
 * return: lien de l'avatar
 */
function getAvatar(sex){
    let res = "https://avataaars.io/?avatarStyle=Transparent"

    
    if(sex === "M"){
        res+="&topType=" + AVATAR.modules[0][getRandomInt(AVATAR.modules[0].length)]; 
    }
    else{
        res+="&topType=" + AVATAR.modules[1][getRandomInt(AVATAR.modules[1].length)];
    }
    res+="&accessoriesType=" + AVATAR.modules[2][getRandomInt(AVATAR.modules[2].length)];
    res+="&hairColor="+AVATAR.modules[3][getRandomInt(AVATAR.modules[3].length)];
    if(sex === "M"){
        res+="&facialHairType="+AVATAR.modules[4][getRandomInt(AVATAR.modules[4].length)];
        res+="&facialHairColor="+AVATAR.modules[5][getRandomInt(AVATAR.modules[5].length)];
    }
    else{
        res+="&facialHairType=Blank";
    }
    res+="&clotheType="+AVATAR.modules[6][getRandomInt(AVATAR.modules[6].length)];
    res+="&clotheColor="+AVATAR.modules[7][getRandomInt(AVATAR.modules[7].length)];
    res+="&eyeType="+AVATAR.modules[8][getRandomInt(AVATAR.modules[8].length)];
    res+="&eyebrowType="+AVATAR.modules[9][getRandomInt(AVATAR.modules[9].length)];
    res+="&mouthType="+AVATAR.modules[10][getRandomInt(AVATAR.modules[10].length)];
    res+="&skinColor="+AVATAR.modules[11][getRandomInt(AVATAR.modules[11].length)];

    return res;
}  


/**
 * randomG : Retourne un nombre random entre 0.1 et 0.95
 * 
 * return: Nombre random entre 0.1 et 0.95
 */
function randomG(){ 

    return Math.random(0.1,0.95);
    }


/**
 * getRandomStudent :Retourne un élève aléatoire
 * 
 * return: élève
 */
function getRandomStudent(){

    let index = Math.floor( Math.random() * listNomUtilise.modules.length);
    let student = listNomUtilise.modules[index];
    return student;
    
}

/**
 * Retourne un nombre random entre 0 et max
 * 
 * param : 
 *      max: Nombre max à ne pas dépasser
 * return: Nombre random
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


/**
 * Créé un élève
 */
module.exports = function createStudent(){


    let eleve_json = []; //Classe renvoyer
    let eleve_utilise = []; //Élèves déjà utilisée
    
    //Créé la classe
    for (let i = 0; i < 25; i++) {
        let student = getRandomStudent();  //Génère un élève

        //Si cette élève existe déjà il le génère à nouveau
        if(eleve_utilise.includes(student)){
            while(eleve_utilise.includes(student)){
                student = getRandomStudent();
            }
        }
        //Sinon il l'enregistre dans les élèves déjà utilisée
        else{
            eleve_utilise.push(student);
        }
        //compétences :
        let  speedComprehension= randomG();
        let  analysisSpeed= randomG();
        let  answerAccuracy= randomG();

        //efforts :
        let  routinely = randomG();
        let  classAttendence= randomG();
        let  focusness = randomG();
        
        let lettre = getRandomInt(2) == 1 ? "A" : "B";

        //Créé le schema de l'élève avec les valeurs suivantes
        const new_student = new studentSchema({
            name: student[1]+" "+student[2],
            sex: student[0],
            competence: (speedComprehension + analysisSpeed + answerAccuracy) / 3,
            effort: (routinely + classAttendence + focusness) / 3,
            speedComprehension: speedComprehension,
            analysisSpeed: analysisSpeed,
            routinely: routinely,
            answerAccuracy: answerAccuracy,
            classAttendence: classAttendence,
            focusness:focusness,
            img: getAvatar(student[0]),
            class: lettre,
            
            
        });

        try{
            //Ajoute l'élève dans la listes d'élèves
            eleve_json.push(new_student);
        }
        catch(error){

        }


    }
    
    let prof = teacher();
    for(var teachers in prof){
        eleve_json.push(prof[teachers]);
    }


    return eleve_json;


}

