import axios from 'axios';
import localForage from 'localforage';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const addEmployee = (newEmployee, theToken) => {
   return axios
      .post(serverPath + '/employee/register', {
         uuid: newEmployee.uuid,
         first_name: newEmployee.first_name,
         last_name: newEmployee.last_name,
         email: newEmployee.email,
         password: newEmployee.password,
         admin: newEmployee.admin,
         token: theToken,
         caller: 'EmployeeFunctions.register'
      })
      .then((res) => {
         console.log('Registered');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ EmployeeFunctions > getEmployees ' + err
         );
         return '++Error Loc 10';
      });
};
export const editEmployee = (editEmployee, theToken) => {
   return axios
      .post(serverPath + '/employee/edit', {
         id: editEmployee.id,
         first_name: editEmployee.first_name,
         last_name: editEmployee.last_name,
         email: editEmployee.email,
         password: editEmployee.password,
         token: theToken,
         caller: 'EmployeeFunctions.editEmployee'
      })
      .then((res) => {
         console.log('EmployeeFunctions.editEmployee');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ EmployeeFunctions.editEmployee ' + err
         );
         return '++Error Loc 10';
      });
};

export const removeEmployee = (id, token) => {
   return axios
      .post(serverPath + '/employee/remove_employee', {
         id,
         token,
         caller: 'EmployeeFunctions.register'
      })
      .then((res) => {
         console.log('Employee Removed');
         return 1;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ EmployeeFunctions > removeEmployee ' + err
         );
         return '++Error Loc 02';
      });
};

export const getEmployees = async (theToken) => {
   try {
      const res = await axios.post(serverPath + '/employee/get_employees', {
         token: theToken,
         caller: 'EmployeeFunctions.getEmployee'
      });
      //console.log(res.data)
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ EmployeeFunctions > getEmployees ' + err);
      return '++Error Loc 07';
   }
};
//export const employeeIsLoggedIn = token => {
