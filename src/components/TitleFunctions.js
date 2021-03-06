import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const editTitle = (editTitle, theToken) => {
   return axios
      .post(serverPath + '/titles/edit', {
         id: editTitle.id,
         first_name: editTitle.first_name,
         last_name: editTitle.last_name,
         email: editTitle.email,
         password: editTitle.password,
         token: theToken,
         caller: 'TitleFunctions.editTitle',
      })
      .then((res) => {
         console.log('TitleFunctions.editTitle');
         return res;
      })
      .catch((err) => {
         console.log('ClientSide Error @ TitleFunctions.editTitle ' + err);
         return '++Error Loc 10';
      });
};

export const getTitles = async (theToken) => {
   try {
      const res = await axios.post(serverPath + '/titles/get_titles', {
         token: theToken,
         caller: 'TitleFunctions.getTitle',
      });
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ TitleFunctions > getTitles ' + err);
      return '++Error Loc 07';
   }
};
