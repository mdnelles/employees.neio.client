import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import localForage from 'localforage';

import { userIsLoggedIn } from './components/UserFunctions';
import './App.css';

import { Dba } from './components/Dba';
import { Home } from './components/Home';
import { Loading } from './components/Loading';
import { LogView } from './components/LogView';
import { Navbar } from './widgets/Navbar';
import { Users } from './components/Users';

export const AppWrapper = () => {
   const [activeSession, setActiveSession] = useState('loading');

   useEffect(() => {
      localForage
         .getItem('token', function(err, theToken) {
            if (err) {
               console.error('token err -> ' + err);
            } else {
               userIsLoggedIn(theToken)
                  .then((data) => {
                     // imported fun
                     if (data === true || data === 'true') {
                        setActiveSession('ok');
                     } else {
                        window.location.href = '/';
                     }
                  })
                  .catch((err) => {
                     console.log('user is not logged in ' + err);
                     window.location.href = '/';
                  });
            }
         })
         .catch((err) => {
            console.log('user is not logged in ' + err);
            window.location.href = '/';
         });
   }, []);

   var ret = '';
   if (activeSession === 'no') {
      ret = <Redirect to='/' />;
   } else if (activeSession === 'loading') {
      ret = <Route path='/' component={Loading} />;
   } else {
      ret = (
         <div>
            <Navbar />
            <div className='appHolder'>
               <Route exact path='/dba' component={Dba} />
               <Route exact path='/home' component={Home} />
               <Route exact path='/logs' component={LogView} />
               <Route exact path='/users' component={Users} />
            </div>
         </div>
      );
   }

   return ret;
};
