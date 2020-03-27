import React, { useState, useEffect } from 'react';
import { getUsers, removeUser, addUser } from './UserFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import { Msg } from '../widgets/Msg';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
   table: {
      minWidth: 650
   }
});

export const Settings = () => {
   const [open, setOpen] = useState(false);
   const [token, setToken] = useState('no token');
   const [users, setUsers] = useState([]);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');

   const [msgClass, setMsgClass] = useState('displayNone');
   const [spinnerClass, setSpinnerClass] = useState('displayNone');
   const [msg, setMsg] = useState('');
   const [alertColor, setAlertColor] = useState('info');

   const removeUserStart = (theUuid) => {
      if (window.confirm('Are you sure you want to delete this?')) {
         if (theUuid !== undefined) {
            removeUser(theUuid, token)
               .then((res) => {
                  setUsers(users.filter((user) => user.uuid !== theUuid));
               })
               .catch((err) => {
                  console.log('Err: could not remove user ' + err);
               });
         }
      } else {
         return false;
      }
   };

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const clearUndefined = (str) => {
      if (str === undefined || str === '') {
         str = 'NA';
         return str;
      }
   };
   const addUserStart = (data) => {
      setMsgClass('displayBlock');
      setSpinnerClass('displayBlock');
      setMsg('Adding user to database');

      setFirstName(clearUndefined(firstName));
      setLastName(clearUndefined(lastName));
      setEmail(clearUndefined(email));
      setPassword(clearUndefined(password));

      var id = uuid();
      var newUser = {
         uuid: id,
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: password
      };
      setOpen(false);
      addUser(newUser, token).then((res) => {
         console.log(res);
         //setAllVals([...allVals,newData]);
         setUsers([...users, newUser]);
         setEmail(''); // clear values
         setPassword('');
         setFirstName('');
         setLastName('');
         setSpinnerClass('displayNone');
         setAlertColor('success');
         setMsg('New Entry added to Database');
      });
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
         <h3>Settings</h3> <br />
         <Msg
            msgClass={msgClass}
            spinnerClass={spinnerClass}
            msg={msg}
            alertColor={alertColor}
         />
      </div>
   );
};
