import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Login from './component/LOGIN/indexLOGIN'
import Home from './component/HOME/indexHOME'
import {Provider} from 'react-redux'
import store from './Redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
