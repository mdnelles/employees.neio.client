import React, { useState, useEffect } from 'react';
import { getUsers, removeUser, addUser } from './UserFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import { Msg } from './widgets/Msg';

import Alert from '@material-ui/lab/Alert';
import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';

import IconButton from '@material-ui/core/IconButton';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: '#8888',
      color: '#fff',
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.background.default,
      },
   },
}))(TableRow);

function createData(table, engine, rowFormat, rows, aveLen, indexLength) {
   return { table, engine, rowFormat, rows, aveLen, indexLength };
}

const rows = [
   createData(
      'departments',
      'InnoDB',
      'Dynamic',
      9,
      1820,
      '16.0KiB',
      '16.0 KiB'
   ),
   createData(
      'dept_emps',
      'InnoDB',
      'Dynamic',
      331143,
      36,
      '11.5MiB',
      '5.5 MiB'
   ),
   createData(
      'dept_managers',
      'InnoDB',
      'Dynamic',
      24,
      682,
      '16.0MiB',
      '16.0 bytes'
   ),
   createData(
      'employees',
      'InnoDB',
      'Dynamic',
      298936,
      50,
      '14.5MiB',
      '0.0 bytes'
   ),
   createData('logs', 'InnoDB', 'Dynamic', 24642, 149, '3.5MiB', '0.0 bytes'),
   createData(
      'salaries',
      'InnoDB',
      'Dynamic',
      2828426,
      35,
      '95.6 MiB',
      '0.0 bytes'
   ),
   createData(
      'titles',
      'InnoDB',
      'Dynamic',
      442308,
      46,
      '19.6 MiB',
      '0.0 bytes'
   ),
   createData('users', 'InnoDB', 'Dynamic', 26, 630, '16.0 KiB', '16.0 KiB'),
];

const useStyles = makeStyles({
   table: {
      minWidth: 700,
   },
});

export const Statistics = () => {
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

   useEffect(() => {
      //localForage.getItem('token', function(err, theToken) {
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
   }, []);

   return (
      <div id='main' className='body'>
         <h3>Employee App</h3> <br />
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
         <div className={alert2Class}></div>
         <div style={{ display: 'block', padding: 20 }}></div>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Table</StyledTableCell>
                     <StyledTableCell>Engine</StyledTableCell>
                     <StyledTableCell>Row Format</StyledTableCell>
                     <StyledTableCell>Rows</StyledTableCell>
                     <StyledTableCell>Ave/len</StyledTableCell>
                     <StyledTableCell>Index Length</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <StyledTableRow key={row.table}>
                        <StyledTableCell
                           component='th'
                           scope='row'
                           style={{ fontWeight: 'bold' }}
                        >
                           {row.table}
                        </StyledTableCell>
                        <StyledTableCell component='th' scope='row'>
                           {row.engine}
                        </StyledTableCell>
                        <StyledTableCell>{row.rowFormat}</StyledTableCell>
                        <StyledTableCell>{row.rows}</StyledTableCell>
                        <StyledTableCell>{row.aveLen}</StyledTableCell>
                        <StyledTableCell>{row.indexLength}</StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};
