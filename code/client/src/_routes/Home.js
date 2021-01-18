import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';

import './css/Home.css';
import StudentCard from '../_components/StudentCard';

/**
 * Ce composant correspond à la page d'acceuil de notre jeu sérieux.
 * Cette page présente brièvement le principe du jeu.
 * Il est demandé au joueur d'entrer un nom d'utilisateur et permet ensuite de lancer la partie.
 */
const Home = () => {

  const [username, setUsername] = useState('');
  const [usernameValidity, setUsernameValidity] = useState(''); 
  const history = useHistory();

  /**
   * Cette méthode est appelée lors d'un changement de valeur du formulaire de nom d'utilisateur
   */
  const handleUsernameChange = (e) => {
    e.preventDefault();
    const value = e.target.value.toString();
    setUsername(value);
    if(value.length < 2 || value.length > 16)
      setUsernameValidity("Le nom d'utilisateur doit faire entre 2 et 15 caractères.");
    else if(!Array.from(value).some(char=>char.match(/[a-z]/)))
      setUsernameValidity("Il doit y avoir au moins une lettre.");
    else if(!/^([a-z0-9-])*$/.test(value))
      setUsernameValidity('Seuls les minuscules, les chiffres et les \'-\' sont autorisés.');
    else
      setUsernameValidity('');
  }

  /**
   * Cette méthode est appelée lors d'un appui sur le bouton pour commencer à jouer.
   */
  const handlePlay = (e) => {
    e.preventDefault();
    if(usernameValidity === '' && username !== ''){
      localStorage.setItem('username', username);
      history.push('/choose-student');
    }
  }

  return(
    <>
    <div className='navbar'>
        <div className='navbar__brand'>The Director</div>
        <Link to='/ranking' className='navbar__item navbar__ranking'>Classement</Link>
    </div>
  
    <div className='home'>
      
      <div className="home__presentation home_box">
        <div className='home__title'>Incarnez le directeur modèle</div>
        <div className='home__texte'>
            Bienvenue dans notre serious game : <strong>The Director</strong>
            <br></br>Vous allez devoir répartir les élèves en deux classes, faites le bon choix !
        </div>
        
        <form className='home__play-form' onSubmit={handlePlay}>
          <input className='home__username' onChange={handleUsernameChange} type='text' placeholder="Nom d'utilisateur"></input>
          <div type='submit' onClick={handlePlay} className={`home__play ${usernameValidity === '' && username !== '' ? '' : 'disabled'}`}>Jouer</div>
        </form>
        <div className={`home__error ${usernameValidity !== '' ? '' : 'hidden'}`}>{usernameValidity}</div>
      </div>

      <div className="home__animation">
        <div className="home__animation home__cards"><StudentCard student={STUDENTS[0]}/></div>
        <div className="home__animation home__cards"><StudentCard student={STUDENTS[1]}/></div>
        <div className="home__animation home__cards"><StudentCard student={STUDENTS[2]}/></div>
        <div className="home__animation home__cards"><StudentCard student={STUDENTS[3]}/></div>
      </div>
    </div>

    </>)
}

const STUDENTS = [
  {
    name: "Jean Lamoureux",
    sex: "H",
    speedComprehension: 0.43,
    analysisSpeed: 0.79,
    routinely: 0.20,
    answerAccuracy: 0.70,
    classAttendence: 0.12,
    focusness: 0.45,
    img: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=Blonde&clotheType=BlazerSweater&eyeType=Default&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Pale"
  },
  {
    name: "Marine Dagenais",
    sex: "F",
    speedComprehension: 0.87,
    analysisSpeed: 0.95,
    routinely: 0.63,
    answerAccuracy: 0.58,
    classAttendence: 0.28,
    focusness: 0.95,
    img:"https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=Overall&clotheColor=Blue02&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Pale"
  },
  {
    name: "Pierre Larivière",
    sex: "H",
    speedComprehension: 0.43,
    analysisSpeed: 0.49,
    routinely: 0.20,
    answerAccuracy: 0.70,
    classAttendence: 0.12,
    focusness: 0.14,
    img:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Blue01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Brown"
  },
  {
    name: "Maxime Bolduc",
    sex: "H",
    speedComprehension: 0.43,
    analysisSpeed: 0.34,
    routinely: 0.20,
    answerAccuracy: 0.21,
    classAttendence: 0.55,
    focusness: 0.23,
    img:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Default&eyebrowType=Default&mouthType=Serious&skinColor=Pale"
  },
]



export default Home;