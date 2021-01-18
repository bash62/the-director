const teacherSchema = require('../models/teacherSchema');
const STUDENTS  = require('./name_list.js');
const AVATAR  = require('./teacher_avatar_list.js');

/**
 * Retourne un lien d'un avatar aléatoire pour un professeur en fonction du sex
 * 
 * param
 *      sex: sexe du professeur
 * 
 * return: lien de l'avatar
 */
function getAvatar(sex){
    var res = "https://avataaars.io/?avatarStyle=Circle"

    
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
    res+="&eyeType="+AVATAR.modules[7][getRandomInt(AVATAR.modules[7].length)];
    res+="&eyebrowType="+AVATAR.modules[8][getRandomInt(AVATAR.modules[8].length)];
    res+="&mouthType="+AVATAR.modules[9][getRandomInt(AVATAR.modules[9].length)];
    res+="&skinColor="+AVATAR.modules[10][getRandomInt(AVATAR.modules[10].length)];

    return res;
}  

function getRandomComp(){
    let res = [];
    res.push(getRandomInt(2));
    res.push(getRandomInt(2));
    return res;
}


/**
 * Retourne un professeur aléatoire
 * 
 * return: professeur
 */
function getRandomTeacher(){

    let index = Math.floor( Math.random() * STUDENTS.modules.length);
    let teacher = STUDENTS.modules[index];
    return teacher;
    
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
 * Retourne un nombre random d'année d'étude
 * 
 * return: Nombre random entre 3 et 8 ans
 */
function getRandomAnneeEtude() {
    return getRandomInt(5)+3;
}


/**
 * Retourne un nombre random de l'age
 * 
 * param
 *      anneeEtude: Années d'études
 * 
 * return: Nombre random entre 26 et 66
 */
function getRandomAge(anneeEtude) {
    return getRandomInt(43-anneeEtude)+anneeEtude+23;
}

/**
 * Retourne un nombre random de l'age
 * 
 * param
 *      anneeEtude: Années d'études
 *      age: Age
 * 
 * return: Nombre random entre 0 et 41
 */
function getExperience(age,anneeEtude) {
    
    return age-anneeEtude-22;
}


/**
 * Retourne un nombre random de l'age
 * 
 * param
 *      teacherName: Nom du professeur
 *      jugementCompetence: Jugement de compétence
 *      jugementEffort: Jugement des efforts
 *      sex: Sex du professeur
 * 
 * return: Nombre random entre 26 et 66
 */
function getDescription(teacherName, jugementCompetence, jugementEffort,sex,anneeEtude){
    let description = teacherName;
    if(sex=="M"){
        description+=" est un enseignant";
    }
    else{
        description+=" est une enseignante";
    }
    if(jugementCompetence == 1 && jugementEffort == 1){
        description+=" qui juge les competences et les efforts.";
    }
    
    else if(jugementCompetence == 1 && jugementEffort == 0){
        description+=" qui juge plus les competences.";
    }
    
    else if(jugementCompetence == 0 && jugementEffort == 1){
        description+=" qui juge plus les efforts.";

    }

    else if(jugementCompetence == 0 && jugementEffort == 0){
        description+=" qui ne juge pas les élèves.";
        
    }
    else{
        throw new Error("Verifier la fonction getDescription()");
    }
    if(sex=="M"){
        description+=" Il a fait "+anneeEtude+" ans d'études."
    }
    else{
        description+=" Elle a fait "+anneeEtude+" ans d'études."
    }
    return description;
}


/**
 * Créé un professeur
 */
module.exports = function createTeacher() {
    
    /**
     * 
     * 
     * 
     */


    let teacher_comp = getRandomComp(); //Liste des compétences déja utilisée
    let teacher_comp_utilise = getRandomComp(); //Liste des compétences déja utilisée
    let teacher_json = []; //Liste des professeur renvoyer
    let teacher_utilise = []; //Liste des professeur déja utilisée
    let class_name = ["A","B"]; //Liste des classes


    for(let i = 0; i<2; i++){

        // Vérifie que un professeur ne soit pas créé en doublon.
        let teacher = getRandomTeacher();
        if(teacher_utilise.includes(teacher)){
            while(teacher_utilise.includes(teacher)){
                teacher = getRandomTeacher();
            }
        }

        teacher_utilise.push(teacher);

        let teacherName;
        if(teacher[0] === "M"){
             teacherName = "M. " + teacher[2];
        }
        else{
            teacherName = "Mme " + teacher[2];
        }

        // Vérifie que deux profs non pas le même profils 
        if(teacher_comp[0] == teacher_comp_utilise[0] && teacher_comp[1] == teacher_comp_utilise[1]){
            while((teacher_comp[0] == teacher_comp_utilise[0] && teacher_comp[1] == teacher_comp_utilise[1])){
                teacher_comp = getRandomComp();
            }

        }

        teacher_comp_utilise = teacher_comp;


        let jugementCompetence=teacher_comp[0];
        let jugementEffort=teacher_comp[1];

        


        //Information sur le professeur
        let anneeEtude = getRandomAnneeEtude();
        let age=getRandomAge(anneeEtude);
        let experience = getExperience(age,anneeEtude);


        //Créé le schema de le professeur avec les valeurs suivantes
        const new_teacher = new teacherSchema({
            name : teacherName,
            sex : teacher[0],
            anneeEtude : anneeEtude,
            age : age,
            experience : experience,
            jugementCompetence : jugementCompetence,
            jugementEffort : jugementEffort,
            description: getDescription(teacherName,jugementCompetence,jugementEffort,teacher[0],anneeEtude),
            img: getAvatar(teacher[0]) ,
            class: class_name[i],
          
        })
        //Ajoute le professeur dans la listes de professeur
        teacher_json.push(new_teacher);

    }

    return teacher_json;
}