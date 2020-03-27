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
import { DrawerCus } from './widgets/DrawerCus';
import { Users } from './components/Users';
import { Employees } from './components/Employees';
import { Departments } from './components/Departments';
import { DeptManager } from './components/DeptManager';
import { Titles } from './components/Titles';
import { Salaries } from './components/Salaries';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';

export const AppWrapper = () => {
   const [activeSession, setActiveSession] = useState('loading'),
      [drawerState, setDrawerState] = useState(false);

   const toggleDrawer = () => {
      setDrawerState(!drawerState);
   };

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
            <Navbar toggleDrawer={toggleDrawer} />
            <DrawerCus
               drawerState={drawerState}
               key={drawerState}
               toggleDrawer={toggleDrawer}
            />
            <div className='appHolder'>
               <Route exact path='/dba' component={Dba} />
               <Route exact path='/home' component={Home} />
               <Route exact path='/logs' component={LogView} />
               <Route exact path='/users' component={Users} />
               <Route exact path='/employees' component={Employees} />
               <Route exact path='/departments' component={Departments} />
               <Route exact path='/dept_manager' component={DeptManager} />
               <Route exact path='/titles' component={Titles} />
               <Route exact path='/salaries' component={Salaries} />
               <Route exact path='/stats' component={Statistics} />
               <Route exact path='/settings' component={Settings} />
            </div>
         </div>
      );
   }

   return ret;
};
