import React, { useState, useEffect } from 'react';
import { getUsers, removeUser, addUser } from './UserFunctions';
import { getSalaries } from './SalariesFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import { Msg } from './widgets/Msg';

import Alert from '@material-ui/lab/Alert';
import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
//import { SalariesTable } from './tables/SalariesTable';
//import { SalarieCard } from './SalarieCard';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
   table: {
      minWidth: 650,
   },
});

let salaryClass = [];
for (let index = 10000; index <= 200000; index += 2500) {
   salaryClass.push(index);
}
const classChange = (event) => {};

let i = 1000;
export const Salaries = () => {
   const classes = useStyles();
   const [salaryData, setSalaryData] = useState([]),
      [alert2Severity, setAlert2Severity] = useState('warning'),
      [alert2Msg, setAlert2Msg] = useState(''),
      [alert2Class, setAlert2Class] = useState('displayBlock'),
      [token, setToken] = useState('no token'),
      [dataBySalary, setDataBySalary] = useState(60000),
      [dataFetched, setDataFetched] = useState(false),
      [reset, setReset] = useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [open, setOpen] = React.useState(true),
      [cardClass, setCardClass] = useState('displayBlock'),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const fetchSalaryClass = () => {
      console.log('do specific query');
      console.log('the salary range is ' + dataBySalary);
      getSalaries(token, dataBySalary).then((data) => {
         setDataFetched(data);
      });
   };

   const closeAlert2 = () => {
      console.log('here in here');
      setAlert2Class('displayNone');
   };

   useEffect(() => {
      if (salaryData === []) {
         localForage
            .getItem('token')
            .then(function (theToken) {
               setToken(theToken);
            })
            .catch(function (err) {
               // This code runs if there were any errors
               console.log(err);
               alert('no token found');
               window.location.href = '/';
            });
      }
   }, []);

   return (
      <div id='main' className='body'>
         <h3>Employee Salaries</h3> <br />
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
         <div style={{ display: 'block', padding: 20 }}></div>
         <div className={alert2Class}>
            <Alert
               variant='filled'
               severity='info'
               action={
                  <IconButton
                     aria-label='close'
                     color='inherit'
                     size='small'
                     onClick={() => {
                        closeAlert2();
                     }}
                  >
                     <CloseIcon fontSize='inherit' />
                  </IconButton>
               }
            >
               The database houses more than 300k records as such viewing them
               has been broken down in to smaller classifications
            </Alert>
         </div>
         <div style={{ display: 'block', padding: 20 }}></div>
         <InputLabel id='demo-simple-select-label'>
            Select Salary Range (annually)
         </InputLabel>
         <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={dataBySalary}
            onChange={(event) => setDataBySalary(event.target.value)}
            style={{ width: 300, marginRight: 25 }}
         >
            {salaryClass.map((aclass) => (
               <MenuItem value={aclass} key={uuid()}>
                  ${aclass + ' - ' + (aclass + 2499)}
               </MenuItem>
            ))}
         </Select>
         <Button variant='contained' color='primary' onClick={fetchSalaryClass}>
            Fetch Data
         </Button>
      </div>
   );
};
