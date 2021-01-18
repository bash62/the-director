import PropTypes from "prop-types";
import { ReactComponent as MaleIcon} from '../img/male_symbol.svg';
import { ReactComponent as FemaleIcon} from '../img/female_symbol.svg';

import './css/TeacherCard.css';

/**
 * Ce composant représente une 'carte' de professeur.
 * Elle permet de visualiser plusieurs informations à propos de celui-ci comme son nom, son sexe et une description de son profil.
 */
const TeacherCard = (props) => {
  const {teacher} = props;
  return <div className='teacher-card'>
      <div className='teacher-card__presentation'>
        <div className='teacher-card__name'>{teacher.name}</div>
        <div className='teacher-card__sex'>{teacher.sex === 'F' ? <FemaleIcon/> : <MaleIcon/>}</div>
      </div>
      <img className='teacher-card__image' src={teacher.img} alt=''></img>
      <div className='teacher-card__desc'>{teacher.description}</div>
    </div>
}

TeacherCard.propTypes = {
  /**
   * Carte de professeur.
   */
  teacher: PropTypes.shape({
    description: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string,
    sex: PropTypes.string
  })
}

export default TeacherCard;