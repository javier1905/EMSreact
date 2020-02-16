import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Login from './component/LOGIN/indexLOGIN'
import Home from './component/HOME/indexHOME'
import {Provider} from 'react-redux'
import store from './Redux/store'
import {CssBaseline} from '@material-ui/core'
import 'typeface-roboto'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CssBaseline />
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
