import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, getDetails } from './EmployeeFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import Alert from '@material-ui/lab/Alert';
import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';
import { EmployeesTable } from './tables/EmployeesTable';
import { EmployeeCard } from './EmployeeCard';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export const Employees = () => {
   const [open, setOpen] = useState(false),
      [alert2Severity, setAlert2Severity] = useState('warning'),
      [alert2Msg, setAlert2Msg] = useState(''),
      [alert2Class, setAlert2Class] = useState('displayNone'),
      [token, setToken] = useState('no token'),
      [employees, setEmployees] = useState([]),
      [gender, setGender] = useState(''),
      [birth_date, setBirth_date] = useState(''),
      [hire_date, setHire_date] = useState(''),
      [firstName, setFirstName] = useState(''),
      [dataFetched, setDataFetched] = useState(false),
      [reset, setReset] = useState(false),
      [lastName, setLastName] = useState(''),
      [empData, setEmpData] = useState({ departments: [], salaries: [] }),
      [empData2, setEmpData2] = useState({}),
      [msgArr, setMsgArr] = useState(obj),
      [cardClass, setCardClass] = useState('displayNone'),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const [state, setState] = useState({ columns: [], data: [] });

   const handleClose = () => {
      setOpen(false);
   };

   const clearUndefined = (str) => {
      if (str === undefined || str === '') {
         str = 'NA';
         return str;
      }
   };
   const getDetailsStart = (id) => {
      if (id !== undefined) {
         if (cardClass === 'animFadeInFast' || cardClass === 'displayBlock') {
            setCardClass('animFadeOutFast');
         }
         console.log('just set found out');
         getDetails(id, token).then((data) => {
            setTimeout(() => {
               setCardClass('animFadeInFast');
            }, 300);
            setEmpData2(data);
         });
      }
   };
   const addEmployeeStart = () => {
      //setSpinnerClass('displayBlock');
      setMsgArr(
         cubeMsgNext('Adding Employee to Database...', 'success', msgArr)
      );
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );

      setFirstName(clearUndefined(firstName));
      setLastName(clearUndefined(lastName));
      setBirth_date(clearUndefined(birth_date));
      setHire_date(clearUndefined(hire_date));

      var id = uuid();
      var newEmployee = {
         uuid: id,
         first_name: firstName,
         last_name: lastName,
         birth_date: birth_date,
         gender: gender,
         hire_date: hire_date,
      };
      setOpen(false);
      addEmployee(newEmployee, token).then((res) => {
         getEmployees(token).then((data) => {
            console.log(data);
            setEmployees(data);
            setReset(!reset);
         });

         setBirth_date(''); // clear values
         setHire_date('');
         setGender('');
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
      setMsgArr(cubeMsgNext('Loading Employees', 'info', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem('token')
         .then(function (theToken) {
            setToken(theToken);
            getEmployees(theToken).then((data) => {
               setMsgArr(cubeMsgNext('Employees Loaded', 'success', msgArr));
               setDataFetched(true);
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );
               setEmployees(data);

               setState({
                  columns: [
                     { title: 'Emp#', field: 'emp_no' },
                     { title: 'DOB', field: 'birth_date' },
                     { title: 'First Name', field: 'first_name' },
                     { title: 'Last Name', field: 'last_name' },
                     { title: 'G', field: 'gender' },
                     { title: 'H-Date', field: 'hire_date' },
                  ],
                  data: data,
               });
            });
         })

         .catch(function (err) {
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, [reset, msgArr]);

   return (
      <div id='main' className='body'>
         <h3>Employees</h3>
         <div style={{ padding: 25, display: 'block' }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
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

         <div className={cardClass} style={{ marginTop: 15, marginBottom: 2 }}>
            <EmployeeCard empData={empData} empData2={empData2} />
         </div>

         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
         >
            <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
            <DialogContent>
               <DialogContentText>Add New Employee</DialogContentText>
               <TextField
                  autoFocus
                  margin='dense'
                  defaultValue={birth_date}
                  id='birth_date'
                  label='Birthdate'
                  type='birth_date'
                  fullWidth
                  onChange={(event) => setBirth_date(event.target.value)}
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
               <TextField
                  margin='dense'
                  id='gender'
                  label='gender'
                  type='gender'
                  defaultValue={gender}
                  fullWidth
                  onChange={(event) => setGender(event.target.value)}
               />
               <TextField
                  margin='dense'
                  id='hire_date'
                  label='hire_date'
                  type='hire_date'
                  defaultValue={hire_date}
                  fullWidth
                  onChange={(event) => setHire_date(event.target.value)}
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
                  onClick={addEmployeeStart}
                  color='primary'
                  variant='contained'
               >
                  Save New Employee
               </Button>
            </DialogActions>
         </Dialog>
         <br />
         <br />
         <div style={{ paddingBottom: 15 }} class={alert2Class}>
            <Alert severity={alert2Severity} variant='filled'>
               {alert2Msg}
            </Alert>
         </div>

         {!dataFetched ? (
            <CircularProgress />
         ) : (
            <EmployeesTable
               data={employees}
               state={state}
               msgArr={msgArr}
               token={token}
               setMsgArr={setMsgArr}
               setCubeWrapperAnim={setCubeWrapperAnim}
               setState={setState}
               setCardClass={setCardClass}
               setEmpData={setEmpData}
               cubeMsgNext={cubeMsgNext}
               getDetailsStart={getDetailsStart}
               setAlert2Class={setAlert2Class}
               setAlert2Msg={setAlert2Msg}
               setAlert2Severity={setAlert2Severity}
            />
         )}
      </div>
   );
};
