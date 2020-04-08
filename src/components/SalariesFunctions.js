import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const getSalaries = async (theToken, salaryRange) => {
   console.log('t - ' + salaryRange);
   try {
      const res = await axios.post(serverPath + '/salary/get_salaries', {
         salaryRange,
         token: theToken,
         caller: 'SalariesFunctions.getSalaries',
      });
      //console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ SalariesFunctions.getSalaries ' + err);
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
