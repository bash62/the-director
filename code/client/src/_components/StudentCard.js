import PropTypes from "prop-types";
import './css/StudentCard.css';

import ProgressBar from './ProgressBar';

import { ReactComponent as MaleIcon} from '../img/male_symbol.svg';
import { ReactComponent as FemaleIcon} from '../img/female_symbol.svg';

/**
 * Ce composant représente une 'carte' d'élève.
 * Elle permet de visualiser différentes informations à propos d'un élève comme son nom ou son sexe mais également des caractéristiques d'efforts et de compétences qui lui sont propres.
 */
const StudentCard = (props) => {
  const {student} = props;
  return(
    <article className={`student-card ${props.swiped&&props.swiped!==''?'swiped-'+props.swiped:''}`}>
      <div className='student-card__presentation'>
        <div className='student-card__name'>{student.name}</div>
        <div className='student-card__sex'>{student.sex === 'F' ? <FemaleIcon/> : <MaleIcon/>}</div>
      </div>
      <img alt='' className='student-card__icon' src={student.img} onDragStart={(e)=>e.preventDefault()}></img>
      <div className='student-card__props'>

        <div className='student-card__cat-title'>Compétences</div>
        <div className='student-card__cat'>
          <div className='student-card__prop'>Compréhension<ProgressBar value={student.speedComprehension}/></div>
          <div className='student-card__prop'>Vitesse d'analyse<ProgressBar value={student.analysisSpeed}/></div>
          <div className='student-card__prop'>Connaissances<ProgressBar value={student.answerAccuracy}/></div>
        </div>

        <div className='student-card__cat-title'>Efforts</div>
        <div className='student-card__cat'>
          <div className='student-card__prop'>Régularité<ProgressBar value={student.routinely}/></div>
          <div className='student-card__prop'>Attention<ProgressBar value={student.classAttendence}/></div>
          <div className='student-card__prop'>Concentration<ProgressBar value={student.focusness}/></div>
        </div>
      </div>
    </article>
  )
}

StudentCard.propTypes = {
  /**
   * Données de l'élève à afficher.
   */
  student: PropTypes.shape({
    analysisSpeed: PropTypes.number,
    answerAccuracy: PropTypes.number,
    classAttendence: PropTypes.number,
    focusness: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
    routinely: PropTypes.number,
    sex: PropTypes.string,
    speedComprehension: PropTypes.number
  }),
  /**
   * Informe si la carte a été swipée ou non
   */
  swiped: PropTypes.string
}

export default StudentCard;