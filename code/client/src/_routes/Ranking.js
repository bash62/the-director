import {useHistory,Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Spinner from '../_components/Spinner';

import './css/Ranking.css'

import RankingRecapBar from '../_components/RankingRecapBar'

/**
 * Ce composant présente le classement général du jeu.
 * On peut y visualiser les meilleures parties, et cliquer dessus pour aller voir le récapitulatif de chaque partie.
 */
const Ranking = () => {

    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    const API_URL = 'https://the-director-api.herokuapp.com';

    /**
     * Cette méthode permet d'envoyer une requête à l'API afin de récupérer les données des 20 premières parties du classement.
     */
    const getData = async () => {
        const result = await fetch(API_URL+'/ranking?begin=0&end=20').then(res=>res.ok ? res.json() : null).catch();
        if(result === null)
            history.push('/404');
        setdata(result);
        setloading(false);
    }
    
    /**
     * Cette méthode permet d'envoyer une requête à l'API afin de récupérer les données des 20 parties suivantes au classement.
     */
    const getMoreData = async () => {
        setIsFetching(true);
        const start = data.length;
        const end = data.length+20;
        const result = await fetch(API_URL+'/ranking?begin='+start+'&end='+end).then(res=>res.ok ? res.json() : null).catch();
        const array = data;
        for(var i of result) array.push(i);
        setdata([...array]);
        setIsFetching(false);
    }

    useEffect(() => {
        getData();
    }, [])

    return <>
        <div className={`ranking ${loading && 'loading'}`}>
            {loading ? <Spinner/> : <>
            <div className='head-page'>
                <Link to='/' className='home-button'>Accueil</Link>
                <div className='title-page'>Classement</div>
            </div>
            <div className='leaderboard'>
                <div className='general-bar'>
                    <div className='position'>Position</div>
                    <div className='player'>Joueur</div>
                    <div className='finalscore'>Score Final</div>
                </div>
                <div className='all-game'>
                    {
                        data.sort((a,b)=>a.score<b.score? 1: -1).map((element,index) =>
                        <RankingRecapBar key={index} index={index+1} data={data[index]}></RankingRecapBar>)
                    }
                    {isFetching ? <div className='spinner-wrapper'><Spinner></Spinner></div> : <div className='more-button-wrapper'><div className='ranking__more-button' onClick={getMoreData}>Voir plus</div></div>}
                </div>
            </div> 
            </>
            }    
        </div>
    </>
}

export default Ranking;