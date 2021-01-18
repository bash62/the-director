import PropTypes from "prop-types";
import './css/ProgressBar.css';

/**
 * Simple barre de progression horizontale.
 */
const ProgressBar = (props) => {
  return(
    <div className='progress-bar'>
      <div className='progress-bar__value' style={{width: props.value*100+'%'}}>{Math.round(props.value*100)}%</div>
    </div>
  );
}

ProgressBar.propTypes = {
  /**
   * Valeure de la progression.
   */
  value: PropTypes.number
}

export default ProgressBar;