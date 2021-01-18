const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listEleve = require('../handlers/createStudent');
const assert = require('assert');


const app = express();
app.use(express.json()); 

app.get('/startGame', function(req, res) {
    res.status(200).json(listEleve());
  });
  

  describe('GET /startGame', function() {
    it('responds with json', function() {
      return request(app)
        .get('/startGame')
        //.then(res=> res.json())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            for(var eleve in response.body){
              if(eleve < response.body.length - 2){

                assert.equal(typeof(response.body[eleve]._id), 'string')
                assert.equal(typeof(response.body[eleve].sex), 'string')
                assert.equal(typeof(response.body[eleve].competence), 'number')
                assert.equal(typeof(response.body[eleve].effort), 'number')
                assert.equal(typeof(response.body[eleve].analysisSpeed), 'number')
                assert.equal(typeof(response.body[eleve].routinely), 'number')
                assert.equal(typeof(response.body[eleve].answerAccuracy), 'number')
                assert.equal(typeof(response.body[eleve].classAttendence), 'number')
                assert.equal(typeof(response.body[eleve].focusness), 'number')
                assert.equal(typeof(response.body[eleve].img), 'string')
              }
              else{

                assert.equal(typeof(response.body[eleve]._id), 'string')
                assert.equal(typeof(response.body[eleve].sex), 'string')
                assert.equal(typeof(response.body[eleve].anneeEtude), 'number')
                assert.equal(typeof(response.body[eleve].age), 'number')
                assert.equal(typeof(response.body[eleve].experience), 'number')
                assert.equal(typeof(response.body[eleve].jugementCompetence), 'number')
                assert.equal(typeof(response.body[eleve].jugementEffort), 'number')
                assert.equal(typeof(response.body[eleve].description), 'string')
                assert.equal(typeof(response.body[eleve].img), 'string')
                assert.equal(typeof(response.body[eleve].class), 'string')

              }
            }

        })
    });
  });