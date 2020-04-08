import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
      width: '100%',
   },
   container: {
      maxHeight: 440,
   },
});

export const SalaryTable = (props) => {
   const classes = useStyles();
   const [page, setPage] = React.useState(0);
   const [rows, setRows] = React.useState({});
   const [columns, setColumns] = React.useState([]);
   const [paint, setPaint] = React.useState(false);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   React.useEffect(() => {
      console.log('in use effect');
      console.log(props.rowsData);
      if (props.rowsData !== undefined) {
         console.log('props.rowsData length');
         console.log(props.rowsData.length);
         if (props.rowsData.length > 1) {
            console.log('inside');
            setRows(props.rowsData);
            setColumns(props.tableColumns);
            if (paint === false) setPaint(true);
         }
      }
   }, [paint]);

   if (paint === false) {
      console.log('paint === false');
      console.log(props.rowsData);
      return (
         <div>
            <br></br>Please select a salary range
         </div>
      );
   } else {
      console.log('rows: ');
      console.log(rows);
      return (
         <div>
            <Paper className={classes.root}>
               <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label='sticky table'>
                     <TableHead>
                        <TableRow>
                           {columns.map((column) => (
                              <TableCell
                                 key={column.id}
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
                                    {props.columns.map((column) => {
                                       const value = row[column.id];
                                       return (
                                          <TableCell
                                             key={props.column.id}
                                             align={props.column.align}
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
                  rowsPerPageOptions={[10, 25, 100]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
               />
            </Paper>
         </div>
      );
   }
};

{
   /*
props.setAlert2Class('displayNone');
                     props.setViewSalaries(rowData);
                     props.getDeptDetailsStart(rowData.dept_no);
                     props.setMsgArr(
                        props.cubeMsgNext(
                           'Viewing Salaries ' +
                              rowData.first_name +
                              ' ' +
                              rowData.last_name,
                           'info',
                           props.msgArr
                        )
                     );
                     props.setCubeWrapperAnim(
                        props.msgArr[
                           props.msgArr.findIndex((el) => el.current === true)
                        ].anim
                     );
                     
   }
*/
}
