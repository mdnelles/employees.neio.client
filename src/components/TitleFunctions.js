import axios from 'axios';
import './config'; // adding config for folder specific build

var thisServer = window.location.href;
var serverPath = global.config.routerPath;
if (thisServer.includes('3000')) serverPath = global.config.devPath;

export const addTitle = (newTitle, theToken) => {
   return axios
      .post(serverPath + '/title/register', {
         uuid: newTitle.uuid,
         first_name: newTitle.first_name,
         last_name: newTitle.last_name,
         email: newTitle.email,
         password: newTitle.password,
         admin: newTitle.admin,
         token: theToken,
         caller: 'TitleFunctions.register',
      })
      .then((res) => {
         console.log('Registered');
         return res;
      })
      .catch((err) => {
         console.log('ClientSide Error @ TitleFunctions > getTitles ' + err);
         return '++Error Loc 10';
      });
};
export const editTitle = (editTitle, theToken) => {
   return axios
      .post(serverPath + '/title/edit', {
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

export const removeTitle = (id, token) => {
   return axios
      .post(serverPath + '/title/remove_title', {
         id,
         token,
         caller: 'TitleFunctions.register',
      })
      .then((res) => {
         console.log('Title Removed');
         return 1;
      })
      .catch((err) => {
         console.log('ClientSide Error @ TitleFunctions > removeTitle ' + err);
         return '++Error Loc 02';
      });
};

export const getTitles = async (theToken) => {
   try {
      const res = await axios.post(serverPath + '/title/get_titles', {
         token: theToken,
         caller: 'TitleFunctions.getTitle',
      });
      console.log(res.data);
      return res.data;
   } catch (err) {
      console.log('ClientSide Error @ TitleFunctions > getTitles ' + err);
      return '++Error Loc 07';
   }
};
