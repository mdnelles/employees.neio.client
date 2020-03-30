import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import './App3d.css';
import './App3dObjects.css';
import './AppAnim.css';

// AppWrapper protects Admin Panel from non sessioned access
import { AppWrapper } from './AppWrapper';
import { Landing } from './components/Landing';
import { Three } from './components/Three';

class App extends Component {
   render() {
      const LoginContainer = () => (
         <div className='container'>
            <Route path='/' component={Landing} />
         </div>
      );

      return (
         <div className='App'>
            <Router>
               <Switch>
                  <Route exact path='/' component={LoginContainer} />
                  <Route path='/' component={AppWrapper} />
                  <Route path='/three' component={Three} />
               </Switch>
            </Router>
         </div>
      );
   }
}

export default App;
