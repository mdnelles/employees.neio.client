import React, { useState } from 'react';
import localForage from 'localforage';

import { Msg } from '../widgets/Msg';
import { Navbar } from '../widgets/Navbar';
import { DrawerCus } from '../widgets/DrawerCus';
import { HomeMenu } from '../HomeMenu';

export const Home = () => {
   const [msgClass, setMsgClass] = useState('displayNone'),
      [msg, setMsg] = useState(''),
      [alertColor, setAlertColor] = useState('info'),
      [spinnerClass, setSpinnerClass] = useState('displayNone'),
      [token, setToken] = useState('NA'),
      [drawerState, setDrawerState] = useState(false);

   const toggleDrawer = () => {
      setDrawerState(!drawerState);
   };

   React.useEffect(() => {
      localForage
         .getItem('token')
         .then(function(theToken) {
            setToken(theToken);
         })
         .catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, []);

   return (
      <div>
         <Navbar toggleDrawer={toggleDrawer} />
         <DrawerCus
            drawerState={drawerState}
            key={drawerState}
            toggleDrawer={toggleDrawer}
         />

         <div id='main' className='body'>
            <h3>Home</h3> <br />
            <Msg
               msgClass={msgClass}
               spinnerClass={spinnerClass}
               msg={msg}
               alertColor={alertColor}
            />
            <HomeMenu />
         </div>
      </div>
   );
};
