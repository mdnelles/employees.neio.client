import React, { useState, useEffect } from 'react';
import { getUsers, removeUser, addUser } from './UserFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import { Msg } from '../widgets/Msg';

export const Home = () => {
   const editUserStart = (theUuid) => {
      // feature not enabled
      console.log(theUuid);
   };

   useEffect(() => {
      //localForage.getItem('token', function(err, theToken) {
      localForage
         .getItem('token')
         .then(function(theToken) {
            setToken(theToken);
            getUsers(theToken).then((data) => {
               setUsers(data);
               console.log(data);
            });
         })
         .catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, []);

   return (
      <div id='main' className='body'>
         <h3>Home</h3> <br />
         <Msg
            msgClass={msgClass}
            spinnerClass={spinnerClass}
            msg={msg}
            alertColor={alertColor}
         />
      </div>
   );
};
