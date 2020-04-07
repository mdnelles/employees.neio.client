import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const addSalaries = (newSalaries, theToken) => {
   return axios
      .post(serverPath + '/salaries/register', {
         uuid: newSalaries.uuid,
         first_name: newSalaries.first_name,
         last_name: newSalaries.last_name,
         email: newSalaries.email,
         password: newSalaries.password,
         admin: newSalaries.admin,
         token: theToken,
         caller: 'SalariesFunctions.register',
      })
      .then((res) => {
         console.log('Registered');
         return res;
      })
      .catch((err) => {
         console.log('ClientSide Error @ SalariesFunctions > getSaries ' + err);
         return '++Error Loc 10';
      });
};
export const editSalaries = (editSalaries, theToken) => {
   return axios
      .post(serverPath + '/salaries/edit', {
         id: editSalaries.id,
         first_name: editSalaries.first_name,
         last_name: editSalaries.last_name,
         email: editSalaries.email,
         password: editSalaries.password,
         token: theToken,
         caller: 'SalariesFunctions.editSalaries',
      })
      .then((res) => {
         console.log('SalariesFunctions.editSalaries');
         return res;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ SalariesFunctions.editSalaries ' + err
         );
         return '++Error Loc 10';
      });
};

export const removeSalaries = (id, token) => {
   return axios
      .post(serverPath + '/salaries/remove_salaries', {
         id,
         token,
         caller: 'SalariesFunctions.register',
      })
      .then((res) => {
         console.log('Salaries Removed');
         return 1;
      })
      .catch((err) => {
         console.log(
            'ClientSide Error @ SalariesFunctions > removeSalaries ' + err
         );
         return '++Error Loc 02';
      });
};

export const getSaries = async (theToken) => {
   try {
      const res = await axios.post(serverPath + '/salaries/get_saries', {
         token: theToken,
         caller: 'SalariesFunctions.getSalaries',
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ SalariesFunctions > getSaries ' + err);
      return '++Error Loc 07';
   }
};
export const getDeptDetails = async (dept_no, theToken) => {
   try {
      const res = await axios.post(
         serverPath + '/salaries/get_employees_by_dept',
         {
            dept_no,
            token: theToken,
            caller: 'SalariesFunctions.getDetails',
         }
      );
      //console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ SalariesFunctions.getDetails ' + err);
      return 'ClientSide Error @ SalariesFunctions.getDetails ';
   }
};
//export const salariesIsLoggedIn = token => {
