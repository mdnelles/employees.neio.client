import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const addDeptManager = (newDeptManager, theToken) => {
   return axios
      .post(serverPath + '/dept_manager/register', {
         uuid: newDeptManager.uuid,
         first_name: newDeptManager.first_name,
         last_name: newDeptManager.last_name,
         email: newDeptManager.email,
         password: newDeptManager.password,
         admin: newDeptManager.admin,
         token: theToken,
         caller: 'DeptManagerFunctions.register',
      })
      .then((res) => {
         console.log('Registered');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DeptManagerFunctions > getDeptManagers ' + err
         );
         return '++Error Loc 10';
      });
};
export const editDeptManager = (editDeptManager, theToken) => {
   return axios
      .post(serverPath + '/dept_manager/edit', {
         id: editDeptManager.id,
         first_name: editDeptManager.first_name,
         last_name: editDeptManager.last_name,
         email: editDeptManager.email,
         password: editDeptManager.password,
         token: theToken,
         caller: 'DeptManagerFunctions.editDeptManager',
      })
      .then((res) => {
         console.log('DeptManagerFunctions.editDeptManager');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DeptManagerFunctions.editDeptManager ' + err
         );
         return '++Error Loc 10';
      });
};

export const removeDeptManager = (id, token) => {
   return axios
      .post(serverPath + '/dept_manager/remove_dept_manager', {
         id,
         token,
         caller: 'DeptManagerFunctions.register',
      })
      .then((res) => {
         console.log('DeptManager Removed');
         return 1;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ DeptManagerFunctions > removeDeptManager ' + err
         );
         return '++Error Loc 02';
      });
};

export const getDeptManagers = async (theToken) => {
   try {
      const res = await axios.post(
         serverPath + '/dept_manager/get_dept_managers',
         {
            token: theToken,
            caller: 'DeptManagerFunctions.getDeptManager',
         }
      );
      //console.log(res.data);
      return res.data;
   } catch (err) {
      console.log(
         'ClientSide Error @ DeptManagerFunctions > getDeptManagers ' + err
      );
      return '++Error Loc 07';
   }
};
export const getDeptDetails = async (dept_no, theToken) => {
   try {
      const res = await axios.post(
         serverPath + '/dept_manager/get_employees_by_dept',
         {
            dept_no,
            token: theToken,
            caller: 'DeptManagerFunctions.getDetails',
         }
      );
      //console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ DeptManagerFunctions.getDetails ' + err);
      return 'ClientSide Error @ DeptManagerFunctions.getDetails ';
   }
};
//export const dept_managerIsLoggedIn = token => {
