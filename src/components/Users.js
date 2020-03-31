import React, { useState, useEffect } from 'react';
import { getUsers, removeUser, addUser } from './UserFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import MaterialTable from 'material-table';
/*
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
*/

const useStyles = makeStyles({
   table: {
      minWidth: 650
   }
});

export const Users = () => {
   const [open, setOpen] = useState(false),
      [token, setToken] = useState('no token'),
      [users, setUsers] = useState([]),
      [email, setEmail] = useState(''),
      [password, setPassword] = useState(''),
      [firstName, setFirstName] = useState(''),
      [lastName, setLastName] = useState(''),
      [msgArr, setMsgArr] = useState(obj),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const [state, setState] = useState();

   const classes = useStyles();

   const editUserStart = (theUuid) => {
      //setSpinnerClass('displayNone');
      setMsgArr(
         cubeMsgNext(
            'Edit Feature has been disabled for this app',
            'error',
            msgArr
         )
      );
      // find number of next up slide and then update state of Cube Wrapper to trigger roll
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
   };

   const removeUserStart = (theUuid) => {
      if (window.confirm('Are you sure you want to delete this?')) {
         if (theUuid !== undefined) {
            removeUser(theUuid, token)
               .then(() => {
                  //setSpinnerClass('displayNone');
                  setMsgArr(
                     cubeMsgNext(
                        'User removed from database',
                        'Success',
                        msgArr
                     )
                  );
                  setCubeWrapperAnim(
                     msgArr[msgArr.findIndex((el) => el.current === true)].anim
                  );
                  setUsers(users.filter((user) => user.uuid !== theUuid));
               })
               .catch((err) => {
                  console.log('Err: could not remove user ' + err);
                  //setSpinnerClass('displayNone');
                  setMsgArr(cubeMsgNext('Error: ' + err, 'error', msgArr));
                  setCubeWrapperAnim(
                     msgArr[msgArr.findIndex((el) => el.current === true)].anim
                  );
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
   const addUserStart = () => {
      //setSpinnerClass('displayBlock');
      setMsgArr(cubeMsgNext('Adding User to Database...', 'success', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );

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
         getUsers(token).then((data) => {
            console.log(data);
            setUsers(data);
         });

         //commenting this out (below) rather than update the state going back to the DB for id / last login
         //setUsers([...users, newUser]);
         setEmail(''); // clear values
         setPassword('');
         setFirstName('');
         setLastName('');
         //setSpinnerClass('displayNone');
         setMsgArr(
            cubeMsgNext('New entry added to database', 'success', msgArr)
         );
         // find number of next up slide and then update state of Cube Wrapper to trigger roll
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext('Loading Users', 'Info', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem('token')
         .then(function(theToken) {
            setToken(theToken);
            getUsers(theToken).then((data) => {
               setMsgArr(cubeMsgNext('Users Loaded', 'success', msgArr));
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );
               setUsers(data);
               setState({
                  columns: [
                     { title: 'ID', field: 'id', type: 'numeric' },
                     { title: 'Email', field: 'email' },
                     { title: 'First Name', field: 'first_name' },
                     { title: 'Last Name', field: 'last_name' },
                     { title: 'Last Seen', field: 'last_login' }
                  ],
                  data: data
               });
            });
         })
         .catch(function(err) {
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, []);

   return (
      <div id='main' className='body'>
         <h3>Administrative Users</h3>
         <div style={{ padding: 30, display: 'block' }}></div>
         <div className='contain '>
            <div className={'cubeWrapperFluid ' + cubeWrapperAnim} id='stage'>
               <CubeMsg
                  msgArr={msgArr}
                  width={'100%'}
                  height={78}
                  marginT={-60}
               />
            </div>
         </div>
         <div style={{ padding: 15, display: 'block' }}></div>
         <Button variant='contained' color='primary' onClick={handleClickOpen}>
            Add New User
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
         >
            <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
            <DialogContent>
               <DialogContentText>Add New User</DialogContentText>
               <TextField
                  autoFocus
                  margin='dense'
                  defaultValue={email}
                  id='email'
                  label='Email Address'
                  type='email'
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='password'
                  label='password'
                  type='password'
                  defaultValue={password}
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='firstName'
                  label='First Name'
                  type='text'
                  defaultValue={firstName}
                  fullWidth
                  onChange={(event) => setFirstName(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='lastName'
                  label='Last Name'
                  defaultValue={lastName}
                  type='text'
                  fullWidth
                  onChange={(event) => setLastName(event.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleClose}
                  color='primary'
                  variant='contained'
               >
                  Cancel
               </Button>
               <Button
                  onClick={addUserStart}
                  color='primary'
                  variant='contained'
               >
                  Save New User
               </Button>
            </DialogActions>
         </Dialog>
         <br />
         <br />
         {/*}
         <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />

    */}
         {/* 
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
               <TableHead>
                  <TableRow>
                     <TableCell>ID</TableCell>
                     <TableCell align='left'>Email</TableCell>
                     <TableCell align='left'>First Name</TableCell>
                     <TableCell align='left'>Last Name</TableCell>
                     <TableCell align='left'>Last Login</TableCell>
                     <TableCell align='left'></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {users.map((user) => (
                     <TableRow key={user.uuid}>
                        <TableCell component='th' scope='row'>
                           {user.id}
                        </TableCell>
                        <TableCell align='left'>{user.email}</TableCell>
                        <TableCell align='left'>{user.first_name}</TableCell>
                        <TableCell align='left'>{user.last_name}</TableCell>
                        <TableCell align='left'>
                           {user.last_login !== undefined
                              ? user.last_login.toString().replace('.000Z', '')
                              : ''}
                        </TableCell>
                        <TableCell align='left'>
                           <Button onClick={() => editUserStart(user.uuid)}>
                              Edit
                           </Button>
                           <Button onClick={() => removeUserStart(user.uuid)}>
                              Delete
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         */}
      </div>
   );
};
