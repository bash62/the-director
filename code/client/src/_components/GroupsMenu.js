import PropTypes from "prop-types";
import './css/GroupsMenu.css';

import Group from './Group';

/**
 * Ce composant est un menu simple qui s'agrandit quand il est survolé.
 */
const GroupsMenu = (props) => {
  return(
    <div className={`groups-menu groups-menu--${props.location}`}>
      <div className='groups-menu__toggler'>
        <svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
      </div>
      <Group title={`Classe de ${props.teacher.name}`} teacher={props.teacher} students={props.group}/>
    </div>
  )
}

GroupsMenu.propTypes = {
  /**
   * Tableau contenant les élèves du groupe.
   */
  group: PropTypes.array,
  /**
   * Vaut left ou right selon le côté duquel est placé le menu.
   */
  location: PropTypes.string,
  /**
   * Objet représentant le professeur de la classe.
   */
  teacher: PropTypes.shape({
    /**
    * Nom du professeur
    */
    name: PropTypes.string
  })
}

export default GroupsMenu;