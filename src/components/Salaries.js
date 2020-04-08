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
import { SalaryTable } from './tables/SalaryTable';
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

const tableColumns = [
   {
      title: 'Salary',
      id: 'any_salary',
      ignore: 'c1',
      minWidth: 100,
      format: (value) =>
         '$' +
         value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') +
         '/yr',
   },
   {
      title: 'First Name',
      id: 'first_name',
      ignore: 'c2',
      minWidth: 100,
   },
   {
      title: 'Last Name',
      id: 'last_name',
      ignore: 'c3',
      minWidth: 100,
   },
   {
      title: 'Employee #',
      id: 'emp_no',
      ignore: 'c4',
      minWidth: 100,
   },
   { title: 'Start', id: 'any_start', ignore: 'c5', minWidth: 100 },
   {
      title: 'Finish',
      id: 'any_finish',
      ignore: 'c6',
      minWidth: 100,
   },
];

let salaryClass = [];
for (let index = 37500; index <= 140000; index += 2500) {
   salaryClass.push(index);
}
const classChange = (event) => {};

let i = 1000;
export const Salaries = () => {
   const classes = useStyles();
   const [alert2Severity, setAlert2Severity] = useState('warning'),
      [alert2Msg, setAlert2Msg] = useState(''),
      [alert2Class, setAlert2Class] = useState('displayBlock'),
      [token, setToken] = useState('no token'),
      [salaryRange, setSalaryRange] = useState(60000),
      [dataFetched, setDataFetched] = useState(false),
      [reset, setReset] = useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [doRender, setDoRender] = useState(false),
      [open, setOpen] = React.useState(true),
      [cardClass, setCardClass] = useState('displayBlock'),
      [rowsData, setRowsData] = useState({}),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const fetchSalaryClass = () => {
      getSalaries(token, salaryRange).then((data) => {
         console.log('data just before setting the state');
         console.log(data);
         setRowsData(data);
         setMsgArr(cubeMsgNext('Salary range loaded', 'success', msgArr));
         setDataFetched(true);
         setCubeWrapperAnim(
            msgArr[msgArr.findIndex((el) => el.current === true)].anim
         );
      });
   };

   const closeAlert2 = () => {
      setAlert2Class('displayNone');
   };
   const selChange = (event) => {
      setSalaryRange(event.target.value);
   };
   useEffect(() => {
      if (token === 'no token') {
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
   }, [doRender, rowsData]);

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
         <InputLabel id='salarySelect'>
            Select Salary Range (annually)
         </InputLabel>
         <Select
            labelId='salarySelect'
            style={{ width: 300, marginRight: 25 }}
            onChange={selChange}
            value={salaryRange}
         >
            {salaryClass.map((aclass) => (
               <MenuItem value={aclass} key={aclass}>
                  ${aclass + ' - ' + (aclass + 2499)}
               </MenuItem>
            ))}
         </Select>
         <Button variant='contained' color='primary' onClick={fetchSalaryClass}>
            Fetch Data
         </Button>
         {/* /////////////////////////////////////////// */}
         <SalaryTable
            tableColumns={tableColumns}
            rowsData={rowsData}
            msgArr={msgArr}
            token={token}
            setMsgArr={setMsgArr}
            setCubeWrapperAnim={setCubeWrapperAnim}
            setCardClass={setCardClass}
            cubeMsgNext={cubeMsgNext}
            setAlert2Class={setAlert2Class}
            setAlert2Msg={setAlert2Msg}
            setAlert2Severity={setAlert2Severity}
         />
      </div>
   );
};
