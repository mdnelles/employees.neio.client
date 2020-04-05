import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const addDepartment = (newDepartment, theToken) => {
   return axios
      .post(serverPath + '/department/register', {
         uuid: newDepartment.uuid,
         first_name: newDepartment.first_name,
         last_name: newDepartment.last_name,
         email: newDepartment.email,
         password: newDepartment.password,
         admin: newDepartment.admin,
         token: theToken,
         caller: 'DepartmentFunctions.register',
      })
      .then((res) => {
         console.log('Registered');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DepartmentFunctions > getDepartments ' + err
         );
         return '++Error Loc 10';
      });
};
export const editDepartment = (editDepartment, theToken) => {
   return axios
      .post(serverPath + '/department/edit', {
         id: editDepartment.id,
         first_name: editDepartment.first_name,
         last_name: editDepartment.last_name,
         email: editDepartment.email,
         password: editDepartment.password,
         token: theToken,
         caller: 'DepartmentFunctions.editDepartment',
      })
      .then((res) => {
         console.log('DepartmentFunctions.editDepartment');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DepartmentFunctions.editDepartment ' + err
         );
         return '++Error Loc 10';
      });
};

export const removeDepartment = (id, token) => {
   return axios
      .post(serverPath + '/department/remove_department', {
         id,
         token,
         caller: 'DepartmentFunctions.register',
      })
      .then((res) => {
         console.log('Department Removed');
         return 1;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DepartmentFunctions > removeDepartment ' + err
         );
         return '++Error Loc 02';
      });
};

export const getDepartments = async (theToken) => {
   try {
      const res = await axios.post(serverPath + '/department/get_departments', {
         token: theToken,
         caller: 'DepartmentFunctions.getDepartment',
      });
      //console.log(res.data)
      return res.data;
   } catch (err) {
      console.log(
         'ClientSide Error @ DepartmentFunctions > getDepartments ' + err
      );
      return '++Error Loc 07';
   }
};
export const getDetails = async (id, theToken) => {
   try {
      const res = await axios.post(serverPath + '/department/get_details', {
         id,
         token: theToken,
         caller: 'DepartmentFunctions.details',
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ DepartmentFunctions.getDetails ' + err);
      return 'ClientSide Error @ DepartmentFunctions.getDetails ';
   }
};
//export const departmentIsLoggedIn = token => {
