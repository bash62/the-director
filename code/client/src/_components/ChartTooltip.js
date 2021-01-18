import PropTypes from "prop-types";
import StudentCard from './StudentCard';

import './css/ChartTooltip.css';

/**
 * Ce composant représente un outil de visualisation personnalisé de données sur le graphique d'évolution du score.
 */
const ChartTooltip = (props) => {
  return <>{
    props.payload[0] != null &&
    <div className='chart-tooltip'>
      <StudentCard student={props.data.students[props.payload[0].payload.key-1]} />
    </div>
  }</>
}

ChartTooltip.propTypes = {
  /**
   * Outil de visualisation du graphique de fin de partie.
   */
  data: PropTypes.shape({
    students: PropTypes.object
  }),
  payload: PropTypes.array
}

export default ChartTooltip;