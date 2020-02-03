import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Login from './component/LOGIN/indexLOGIN'
import Home from './component/HOME/indexHOME'



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <React.Fragment>
              <Route exact path='/'>
                <Login/>
              </Route>
              <Route path='/home'>
                <Home/>
              </Route>
          </React.Fragment>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
