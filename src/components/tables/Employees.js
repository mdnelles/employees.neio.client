import React from 'react';
import { removeEmployee, editEmployee } from './EmployeeFunctions';
import MaterialTable from 'material-table';

export const EmployeesTable = (props) => {
   return (
      <div>
         <MaterialTable
            // other props
            actions={[
               {
                  icon: 'info',
                  tooltip: 'Details',
                  onClick: (event, rowData) => {
                     // Do save operation
                     console.log(rowData.emp_no);
                     //props.setModalId(rowData.emp_no);
                     //props.setModalView(true);
                  },
               },
            ]}
            title='Employees'
            columns={props.state.columns}
            data={props.state.data}
            editable={{
               onRowAdd: (newData) =>
                  new Promise((resolve) => {
                     setTimeout(() => {
                        resolve();
                        props.setState((prevState) => {
                           const data = [...prevState.data];
                           data.push(newData);
                           return { ...prevState, data };
                        });
                     }, 600);
                  }),
               onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                     //setTimeout(() => {
                     editEmployee(newData, props.token).then((res) => {
                        resolve();
                        props.setMsgArr(
                           cubeMsgNext(
                              'New entry added to database',
                              'success',
                              props.msgArr
                           )
                        );
                        // find number of next up slide and then update state of Cube Wrapper to trigger roll
                        props.setCubeWrapperAnim(
                           props.msgArr[
                              props.msgArr.findIndex(
                                 (el) => el.current === true
                              )
                           ].anim
                        );
                        if (oldData) {
                           props.setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                           });
                        }
                     });
                  }),
               onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                     //setTimeout(() => {
                     removeEmployee(oldData.id, props.token).then(() => {
                        props.setMsgArr(
                           cubeMsgNext(
                              'Removed employee',
                              'Success',
                              props.msgArr
                           )
                        );
                        props.setCubeWrapperAnim(
                           props.msgArr[
                              props.msgArr.findIndex(
                                 (el) => el.current === true
                              )
                           ].anim
                        );
                        resolve();
                        props.setState((prevState) => {
                           const data = [...prevState.data];
                           props.data.splice(props.data.indexOf(oldData), 1);
                           return { ...prevState, data };
                        });
                     });
                  }),
            }}
         />
      </div>
   );
};
