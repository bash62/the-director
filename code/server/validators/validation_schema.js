const Joi = require('joi');


const studentValidator = Joi.object({
    name: Joi.string().required(),
    sex: Joi.string().min(1).max(1).required(),
    competence: Joi.number().min(0).max(1).required(),
    effort: Joi.number().min(0).max(1).required(),
    speedComprehension: Joi.number().min(0).max(1).required(),
    analysisSpeed: Joi.number().min(0).max(1).required(),
    routinely: Joi.number().min(0).max(1).required(),
    answerAccuracy: Joi.number().min(0).max(1).required(),
    classAttendence: Joi.number().min(0).max(1).required(),
    focusness: Joi.number().min(0).max(1).required(),
    img: Joi.string(),
    class: Joi.string().min(1).max(1),
});

const teacherValidator = Joi.object({
    name: Joi.string().required(),
    sex: Joi.string().min(1).max(1).required(),
    anneeEtude : Joi.number().required(), 
    age : Joi.number().min(18).max(70).required(),
    experience : Joi.number().min(0).max(45).required(),
    jugementCompetence : Joi.number().min(0).max(1).required(),
    jugementEffort : Joi.number().min(0).max(1).required(),
    description : Joi.string().required(),
    img: Joi.string(),
    class: Joi.string().min(1).max(1),
});

const scoreValidator = Joi.object({
    gameId: Joi.string(),
    score: Joi.array().items(Joi.number().min(0).max(1).required()),
});

const gameNullValidator=Joi.object({
    username: Joi.string().min(2).max(16).required(),
    date:Joi.date(),
    students: Joi.array().items(Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        competence: Joi.number().min(0).max(1).required(),
        effort: Joi.number().min(0).max(1).required(),
        speedComprehension: Joi.number().min(0).max(1).required(),
        analysisSpeed: Joi.number().min(0).max(1).required(),
        routinely: Joi.number().min(0).max(1).required(),
        answerAccuracy: Joi.number().min(0).max(1).required(),
        classAttendence: Joi.number().min(0).max(1).required(),
        focusness: Joi.number().min(0).max(1).required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    })).required(),
    teacherA: Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        anneeEtude : Joi.number().required(), 
        age : Joi.number().min(18).max(70).required(),
        experience : Joi.number().min(0).max(45).required(),
        jugementCompetence : Joi.number().min(0).max(1).required(),
        jugementEffort : Joi.number().min(0).max(1).required(),
        description : Joi.string().required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    }),
    teacherB: Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        anneeEtude : Joi.number().required(), 
        age : Joi.number().min(18).max(70).required(),
        experience : Joi.number().min(0).max(45).required(),
        jugementCompetence : Joi.number().min(0).max(1).required(),
        jugementEffort : Joi.number().min(0).max(1).required(),
        description : Joi.string().required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    }),
    score: Joi.array().items(Joi.number().min(0).max(1)),
});

const gameValidator=Joi.object({
    username: Joi.string().min(2).max(16).required(),
    date:Joi.date(),
    students: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        competence: Joi.number().min(0).max(1).required(),
        effort: Joi.number().min(0).max(1).required(),
        speedComprehension: Joi.number().min(0).max(1).required(),
        analysisSpeed: Joi.number().min(0).max(1).required(),
        routinely: Joi.number().min(0).max(1).required(),
        answerAccuracy: Joi.number().min(0).max(1).required(),
        classAttendence: Joi.number().min(0).max(1).required(),
        focusness: Joi.number().min(0).max(1).required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    })).required(),
    teacherA: Joi.object({
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        anneeEtude : Joi.number().required(), 
        age : Joi.number().min(18).max(70).required(),
        experience : Joi.number().min(0).max(45).required(),
        jugementCompetence : Joi.number().min(0).max(1).required(),
        jugementEffort : Joi.number().min(0).max(1).required(),
        description : Joi.string().required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    }),
    teacherB: Joi.object({
        name: Joi.string().required(),
        sex: Joi.string().min(1).max(1).required(),
        anneeEtude : Joi.number().required(), 
        age : Joi.number().min(18).max(70).required(),
        experience : Joi.number().min(0).max(45).required(),
        jugementCompetence : Joi.number().min(0).max(1).required(),
        jugementEffort : Joi.number().min(0).max(1).required(),
        description : Joi.string().required(),
        img: Joi.string(),
        class: Joi.string().min(1).max(1),
    }),
    score: Joi.array().items(Joi.number().min(0).max(1)),
});

module.exports = {
    studentValidator,
    teacherValidator,
    scoreValidator,
    gameValidator,
    gameNullValidator,
}