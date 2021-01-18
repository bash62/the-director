import PropTypes from "prop-types";
import {useParams, useHistory, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Twemoji from 'react-twemoji';
import {LineChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer} from 'recharts';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Spinner from '../_components/Spinner';
import StudentCard from '../_components/StudentCard';
import TeacherCard from '../_components/TeacherCard';
import ChartTooltip from '../_components/ChartTooltip';
import './css/GameRecap.css';

const API_URL = 'https://the-director-api.herokuapp.com';

/**
 * Ce composant représente la page de récapitulatif d'une partie.
 * Elle présente différentes informations sur la partie, comme les deux classes formées par le joueur, mais aussi un graphique de l'évolution du score au cours de la partie.
 * Ainsi, cette page a pour but de pousser le joueur à comprendre les erreurs qu'il a commis pour s'améliorer lors de la partie suivante.
 */
const GameRecap = () => {
  const {game_id} = useParams();
  const history = useHistory();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({});
  const [donutVal, setDonutVal] = useState(0);

   /**
   * Cette fonction envoie une requête à l'API pour récupérer les données de la partie demandée.
   */
  const getData = async () => {
    const result = await fetch(API_URL+'/stats/'+game_id.toString()).then(res=>res.ok ? res.json() : null).catch();
    if(result === null)
      history.push('/404');
    else{
      setdata(result);
      setloading(false);
      setTimeout(() => {
        setDonutVal(result.score[result.score.length-1]*100);
      }, 2000);
    }
  }

  /**
   * Cette fonction est appelée avant le chargement du composant.
   */
  useEffect(() => {
    getData();
  }, [])
  
  return <>
    <div className='game-recap'>
      {loading ? <Spinner/> : <>
      <div className='game-recap__infos'>
        <div className='game-recap__username'>{data.username}</div>
        <Link to='/ranking' className='game-recap__ranking'>Classement</Link>
      </div>
      <div className='groups-wrapper'>
        <div className='game-recap__item group-wrapper groupA-wrapper'>
      <div className='recap__group-title'>Classe de {data.teacherA.name} ({data.students.filter(student=>student.class==='A').length} élèves)</div>
          <div className='recap__group-card recap__teacher-card'>
            <div className='recap__group-card-name'>{data.teacherA.name}</div>
            <img alt='' className='recap__group-card-pic' src={data.teacherA.img}></img>
          </div>
          <TeacherCard teacher={data.teacherA}/>
          <div className='game-recap__students-wrapper'>
            {
              data.students.filter(student=>student.class==='A').map((student, index)=>(
                <>
                <div className='recap__group-card' key={index}>
                  <div className='recap__group-card-name'>{student.name}</div>
                  <img alt='' className='recap__group-card-pic' src={student.img}></img>
                </div>
                <StudentCard student={student}/>
                </>
              ))
            }
          </div>
        </div>
        <div className='game-recap__item group-wrapper groupB-wrapper'>
          <div className='recap__group-title'>Classe de {data.teacherB.name} ({data.students.filter(student=>student.class==='B').length} élèves)</div>
          <div className='recap__group-card recap__teacher-card'>
            <div className='recap__group-card-name'>{data.teacherB.name}</div>
            <img alt='' className='recap__group-card-pic' src={data.teacherB.img}></img>
          </div>
          <TeacherCard teacher={data.teacherB}/>
          <div className='game-recap__students-wrapper'>
            {
              data.students.filter(student=>student.class==='B').map((student, index)=>(
                <>
                <div className='recap__group-card' key={index}>
                  <div className='recap__group-card-name'>{student.name}</div>
                  <img alt='' className='recap__group-card-pic' src={student.img}></img>
                </div>
                <StudentCard student={student}/>
                </>
              ))
            }
          </div>
        </div>
      </div>
      <div className='stats-wrapper'>
        <div className='game-recap__item game-stats'>
          <div className='game-stats__title'>Evolution du score</div>
          <div className='game-stats__legend'>
            <div className='game-stats__legend-item' style={{color: '#8884d8'}}>
              <div className='game-stats__legend-point' style={{background: '#8884d8'}}></div>
              {data.teacherA.name}
            </div>
            <div className='game-stats__legend-item' style={{color: '#82ca9d'}}>
              <div className='game-stats__legend-point' style={{background: '#82ca9d'}}></div>
              {data.teacherB.name}
            </div>
          </div>
          <ResponsiveContainer minWidth={750} width='100%' height='80%'>
            <LineChart data={data.score.map((elem, index)=>({key: index+1, score: elem*100}))} >
              <XAxis minTickGap={30} label={{ value: 'Actions', position: 'insideBottom', offset: 0, fill:'#fff', fontSize: '1.3vw'}} height={40} dataKey="key" domain={[1, 25]} tickSize={5} />
              <YAxis label={{ value: 'Score', position: 'insideLeft', offset: 0, angle: -90, fill:'#fff', fontSize: '1.3vw'}} width={60} domain={[0, 100]} />
              <Tooltip content={<ChartTooltip data={data}/>}/>
              <Line type="monotone" dataKey="score" stroke="#65C9FF" dot={<CustomDot data={data} />} activeDot={<CustomActiveDot data={data} />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='game-recap__item game-score'>
          <div className='game-score__title'>Score</div>
          <SemiCircleProgressBar percentage={donutVal} stroke='#65C9FF' strokeWidth='20' />
          <Twemoji options={{ className: 'game-score__smiley-wrapper' }} >{getSmiley(data.score[data.score.length-1]*100)}</Twemoji>
          <div className='game-score__score-wrapper'>{Math.round(data.score[data.score.length-1]*10000)/100} %</div>
          <Link className='game-score__replay' to='/choose-student'>Rejouer</Link>
        </div>
      </div>
      </>
    }
    </div>
  </>
}

/**
 * Ce composant représente un point du graphique de fin de partie.
 * Sa couleur dépend de la classe dans laquelle a été placé l'élève correspondant à cette action.
 */
const CustomDot = (props) => {
  const { cx, cy, data, payload } = props;
  const color = data.students[payload.key-1].class === 'A' ? '#8884d8' : '#82ca9d';
  return (
    <circle cx={cx} cy={cy} r={4} stroke={color} strokeWidth={1} fill={color} />
  )
}

CustomDot.propTypes = {
  /**
   * Point du graphique de fin de partie.
   */
  cx: PropTypes.number,
  cy: PropTypes.number,
  data: PropTypes.shape({
    students: PropTypes.array
  }),
  payload: PropTypes.shape({
    key: PropTypes.number
  })
}

/**
 * Ce composant représente un point du graphique de fin de partie, lorsqu'il est survolé.
 */
const CustomActiveDot = (props) => {
  const { cx, cy, data, payload } = props;
  const color = data.students[payload.key-1].class === 'A' ? '#8884d8' : '#82ca9d';
  return (
    <circle cx={cx} cy={cy} r={6} stroke={color} strokeWidth={1} fill={color} />
  )
}

CustomActiveDot.propTypes = {
  /**
   * Point actif du graphique de fin de partie.
   */
  cx: PropTypes.number,
  cy: PropTypes.number,
  data: PropTypes.shape({
    students: PropTypes.array
  }),
  payload: PropTypes.shape({
    key: PropTypes.number
  })
}

/**
 * Cette fonction renvoie un émoji en fonction du score passé en paramètres.
 * @param number score 
 */
const getSmiley = (score) => {
  if(score < 25)
    return smileys[0];
  else if(score < 50)
    return smileys[1];
  else if(score < 75)
    return smileys[2];
  else
    return smileys[3];
}

const smileys = ['😭', '😒', '😉', '🥳'];


export default GameRecap;

