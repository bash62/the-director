import PropTypes from "prop-types";
import StudentCard from './StudentCard';
import TeacherCard from '../_components/TeacherCard';

import './css/Group.css';

/**
 * Ce composant représente les acteurs d'une classe sous forme de cartes.
 * Il y'a une carte pour chaque élève et une pour le prof.
 * En survolant une carte on peut visualiser le détail des caractéristiques d'un prof ou d'un élève.
 */
const Group = (props) => {
  return(
    <div className='group'>
      <div className='group__teacher-card'>
        <div className='group__title'>{props.title}</div>
        <img alt='' className='group__card-pic' src={props.teacher.img}></img>
      </div>
      <TeacherCard teacher={props.teacher} />
      <div className='group__content-wrapper'>
        <div className='group__students-counter'>
            <div className='group__students-number'>{props.students.length}</div>élèves
        </div>
        <div className='group__card-wrapper'>
          {
            props.students.map((student, index)=>(
              <>
              <div className='group__card' key={index}>
                <div className='group__card-name'>{student.name}</div>
                <img alt='' className='group__card-pic' src={student.img}></img>
              </div>
              <StudentCard student={student}/>
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

Group.propTypes = {
  /**
   * Composant représentant une classe
   */
  students: PropTypes.array,
  teacher: PropTypes.shape({
    img: PropTypes.string
  }),
  title: PropTypes.string
}

export default Group;