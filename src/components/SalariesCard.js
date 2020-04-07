import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import uuid from 'uuid';

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
   container: {
      maxHeight: 440,
   },
});
const theme = createMuiTheme({
   overrides: {
      MuiTableCell: {
         root: {
            //This can be referred from Material UI API documentation.
            padding: '4px 8px',
         },
      },
   },
});
const columns = [
   { id: 'first_name', label: 'First Name', minWidth: 170 },
   { id: 'last_name', label: 'Last Name', minWidth: 170 },
   { id: 'from_date', label: 'Start', minWidth: 170 },
   { id: 'to_date', label: 'Finish', minWidth: 170 },
];

export const SalariesCard = (props) => {
   const classes = useStyles();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };
   var rows = props.dataBySalaries;

   React.useEffect(() => {});

   if (
      props.viewSalaries.dept_name === undefined ||
      props.viewSalaries.dept_name === ''
   ) {
      return <div>No Salaries Selected</div>;
   } else {
      return (
         <div>
            <Card className={classes.root}>
               <CardHeader
                  avatar={
                     <Avatar aria-label='recipe' className={classes.avatar}>
                        {props.viewSalaries.dept_name !== undefined
                           ? props.viewSalaries.dept_name.charAt(0)
                           : null}
                     </Avatar>
                  }
                  action={
                     <IconButton
                        aria-label='settings'
                        onClick={props.closeCard}
                     >
                        <CloseIcon />
                     </IconButton>
                  }
                  title={props.viewSalaries.dept_name}
                  subheader='Salaries Employees'
               />

               <CardContent>
                  <ThemeProvider theme={theme}>
                     <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label='sticky table'>
                           <TableHead>
                              <TableRow>
                                 {columns.map((column) => (
                                    <TableCell
                                       key={uuid()}
                                       align={column.align}
                                       style={{ minWidth: column.minWidth }}
                                    >
                                       {column.label}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {rows
                                 .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                 )
                                 .map((row) => {
                                    return (
                                       <TableRow
                                          hover
                                          role='checkbox'
                                          tabIndex={-1}
                                          key={uuid()}
                                       >
                                          {columns.map((column) => {
                                             const value = row[column.id];
                                             return (
                                                <TableCell
                                                   key={column.id}
                                                   align={column.align}
                                                >
                                                   {column.format &&
                                                   typeof value === 'number'
                                                      ? column.format(value)
                                                      : value}
                                                </TableCell>
                                             );
                                          })}
                                       </TableRow>
                                    );
                                 })}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                     />
                  </ThemeProvider>
               </CardContent>
            </Card>
         </div>
      );
   }
};
