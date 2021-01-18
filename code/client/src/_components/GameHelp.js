import './css/GameHelp.css';

import {useState} from 'react';

/**
 * Ce composant affiche une fenêtre d'expliquations du jeu en début de partie.
 */
const GameHelp = () => {

  const [open, setOpen] = useState(true);

  return(
    <div className={`game-help ${open ? 'open' : ''}`}>
      <div className='game-help__toggler' onClick={()=>setOpen(!open)}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/>
        </svg>
      </div>
      <div className={`game-help__panel ${open ? 'open' : ''}`}>
        <div className='game-help__cross' onClick={()=>setOpen(false)}>
          <svg width="4vw" height="4vw" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <div className='game-help__content'>
          <div className='game-help__title'>But du jeu</div>
          L'objectif est de répartir les élèves en deux classes. Pour cela il faut se baser sur le jugement du prof et le profil de l'élève.<br/><br/> Un choix est judicieux si l'élève est bon dans un domaine que le prof juge et inversement.<br/><br/> Bonne chance !
        </div>
      </div>
    </div>
  )
}

export default GameHelp;