import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSwipeable} from 'react-swipeable';

import Spinner from '../_components/Spinner';
import GroupsMenu from '../_components/GroupsMenu';
import StudentCard from '../_components/StudentCard';
import GameHelp from '../_components/GameHelp';
import Arrow from '../_components/Arrow';

import './css/ChooseStudent.css';

const API_URL = 'https://the-director-api.herokuapp.com';

/**
 * Ce composant représente la page principale de jeu.
 * Il propose deux menus de classes (un de chaque côté de l'écran) et la carte du joueur suivant pour lequel il faut choisir une classe.
 * De plus, d'autres informations sur la partie en cours sont présentes, comme le nom d'utilisateur du joueur et une bulle explicative du jeu.
 */
const ChooseStudent = () => {

  const history = useHistory();
  
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [classeA, setClasseA] = useState([]);
  const [classeB, setClasseB] = useState([]);
  const [swiped, setSwiped] = useState('');
  const [isOver, setIsOver] = useState(false);

  /**
   * Cette fonction envoie une requête à l'API pour récupérer les données nécessaires pour commencer la partie.
   */
  const getStudents = async () => {
    const result = await fetch(API_URL+'/startGame').then(res=>res.json()).catch();
    setStudents(result);
    setIsLoading(false);
  }
  
  /**
   * Cette fonction est executée au chargement du composant
   */
  useEffect(() => {
    setIsLoading(true);
    if(!localStorage.getItem('username'))
      history.push('/');
    getStudents();
  }, [history])

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => studentSwipeHandler('left'),
    onSwipedRight: (eventData) => studentSwipeHandler('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  /**
   *  Cette fonction est appelée quand un évènement de 'swipe' est déclenché.
   */
  const studentSwipeHandler = (side) => {
    const stud = students;
    const A = classeA;
    const B = classeB;

    if(!isOver && side === 'left'){
      stud[classeA.length + classeB.length].class = 'A';
      A.push(students[classeA.length + classeB.length]);
      setClasseA([...A]);
      setSwiped('left');
      setTimeout(() => {
        setSwiped('stack');
      }, 300);
      setTimeout(() => {
        setSwiped('');
      }, 500);
    }
    if(!isOver && side === 'right'){
      stud[classeA.length + classeB.length].class = 'B';
      B.push(students[classeA.length + classeB.length]);
      setClasseB([...B]);
      setSwiped('right');
      setTimeout(() => {
        setSwiped('stack');
      }, 300);
      setTimeout(() => {
        setSwiped('');
      }, 500);
    }
    setStudents([...stud]);

    //Si la partie est terminée :
    if(!students[A.length + B.length].effort && !isOver){
      setIsOver(true);
      onEndGame();
    }
  }

  /**
   * Cette fonction est appelée en fin de partie pour envoyer à l'api les actions qui ont été effectuées.
   */
  const onEndGame = async() => {
    setIsLoading(true);
    const username = localStorage.getItem('username') || null;
    const gameId = await fetch(API_URL+'/endGame',{
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username,
          students: students.filter(student => !!student.focusness),
          teacherA: students[students.length-2],
          teacherB: students[students.length-1]
      })
    }).then(res=>res.ok ? res.json() : null).catch();
    if(gameId !== null)
      setTimeout(() => {
        history.push('/game-recap/'+gameId);
      }, 1000);

  }

  return(
  <div className='choose-student'  {...handlers}>
    {
      isLoading ? <Spinner/> : <>
      <div className='choose-student__username-wrapper'><div className='choose-student__username'>{localStorage.getItem('username')}</div></div>
      <GameHelp/>
      <GroupsMenu group={classeA} teacher={students[students.length-2]} location='left'/>
      <GroupsMenu group={classeB} teacher={students[students.length-1]} location='right'/>
      <div className='student__choice choice__left' ></div>
      <div className='student__choice choice__right' ></div>
      {
        !isOver && <StudentCard
          student={students[classeA.length + classeB.length]}
          swiped={swiped}
        />
      }
      <div className='choose-student__arrows-wrapper'>
        <Arrow/>
        <Arrow/>
      </div>
      </>
    }
  </div>)
}

export default ChooseStudent;