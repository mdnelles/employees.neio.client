import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
   root: {
      minWidth: 275,
   },
   bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
   },
   title: {
      fontSize: 14,
   },
   pos: {
      marginBottom: 12,
   },
});
/*
function formatMoney(number, decPlaces, decSep, thouSep) {
   (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === 'undefined' ? '.' : decSep);
   thouSep = typeof thouSep === 'undefined' ? ',' : thouSep;
   var sign = number < 0 ? '-' : '';
   var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
   );
   var j = (j = i.length) > 3 ? j % 3 : 0;

   return (
      sign +
      (j ? i.substr(0, j) + thouSep : '') +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep) +
      (decPlaces
         ? decSep +
           Math.abs(number - i)
              .toFixed(decPlaces)
              .slice(2)
         : '')
   );
}*/

export const EmployeeCard = (props) => {
   const classes = useStyles();
   console.log('follow');
   console.log(props.empData2);
   //formatMoney(row.salary, 0, '.', ','

   if (
      props.empData2.departments === undefined ||
      props.empData2.departments === {}
   ) {
      return <div></div>;
   } else {
      return (
         <div>
            <Card className={classes.root}>
               <CardHeader
                  avatar={
                     <Avatar aria-label='recipe' className={classes.avatar}>
                        {props.empData.first_name !== undefined
                           ? props.empData.first_name.charAt(0)
                           : null}
                     </Avatar>
                  }
                  action={
                     <IconButton aria-label='settings'>
                        <MoreVertIcon />
                     </IconButton>
                  }
                  title={
                     props.empData.first_name + ' ' + props.empData.last_name
                  }
                  subheader='Department'
               />

               <CardContent>
                  <Table aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>Department</TableCell>
                           <TableCell align='left'>Start</TableCell>
                           <TableCell align='left'>End</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {props.empData2.departments.map((row) => (
                           <TableRow key={row.emp_no + row.dept_no}>
                              <TableCell align='left'>{row.dept_no}</TableCell>
                              <TableCell align='left'>
                                 {row.from_date}
                              </TableCell>
                              <TableCell align='left'>{row.to_date}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
               <CardContent>
                  <Table aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>Salary</TableCell>
                           <TableCell align='left'>Start</TableCell>
                           <TableCell align='left'>End</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {props.empData2.salaries.map((row) => (
                           <TableRow key={row.emp_no + row.salary}>
                              <TableCell align='left'>${row.salary}</TableCell>
                              <TableCell align='left'>
                                 {row.from_date}
                              </TableCell>
                              <TableCell align='left'>{row.to_date}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>
      );
   }
};
