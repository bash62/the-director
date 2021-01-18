import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './_routes/Home';
import FourOFour from './_routes/FourOFour';

import './App.css';
import ChooseStudent from './_routes/ChooseStudent';
import GameRecap from './_routes/GameRecap';
import Ranking from './_routes/Ranking'

/**
 * Ce composant est le composant principal de l'application.
 * Son rôle est de permettre le routage des différentes pages et composants.
 */
function App() {
  return (
    <div class="App">
      <Router>
        <Switch>
          <Route exact path='/' render={()=><Home />} ></Route>
          <Route exact path='/choose-student' render={()=><ChooseStudent />}></Route>
          <Route exact path='/game-recap/:game_id' render={()=><GameRecap />}></Route>
          <Route exact path='/ranking' render={()=><Ranking />}></Route>
          <Route exact path='/404' component={FourOFour} />
          <Route exact path='*'>
            <Redirect to='/404'/>
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
