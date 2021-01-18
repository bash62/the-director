import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import './css/RankingRecapBar.css'

/**
 * Ce composant représente une ligne du classement général.
 * Elle présente la position dans le classement, le nom d'utilisateur du joueur et le score final d'une partie.
 */
const RankingRecapBar = props => {
    const {data} = props;
    const pos = props.index;
    const color = props.index % 2 === 0 ? '#919191':'#bdbdbd'
    
    return(
        <Link to={`/game-recap/${data._id}`} className='ranking-recap-bar' style={{background:color}}>
            <div className='position opos'>{pos}</div>
            <div className='player'>{data.username}</div>
            <div className='finalscore'>{Math.round(data.score*10000)/100} %</div>
        </Link>
    )   
}

RankingRecapBar.propTypes = {
    /**
     * Données de la ligne du classement.
     */
    data: PropTypes.shape({
        _id: PropTypes.string,
        score: PropTypes.number,
        username: PropTypes.string
    }),
    /**
     * Place de la ligne dans le classement.
     */
    index: PropTypes.number
}

export default RankingRecapBar;