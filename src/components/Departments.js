import React, { useState, useEffect } from 'react';
import { getDepartments, getDeptDetails } from './DepartmentFunctions';
import localForage from 'localforage';
import uuid from 'uuid';

import Alert from '@material-ui/lab/Alert';
import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';
import { DepartmentsTable } from './tables/DepartmentsTable';
import { DepartmentCard } from './DepartmentCard';

import CircularProgress from '@material-ui/core/CircularProgress';

export const Departments = () => {
   const [open, setOpen] = useState(false),
      [alert2Severity, setAlert2Severity] = useState('warning'),
      [alert2Msg, setAlert2Msg] = useState(''),
      [alert2Class, setAlert2Class] = useState('displayNone'),
      [token, setToken] = useState('no token'),
      [dataByDepartment, setDataByDepartment] = useState([]),
      [viewDepartment, setViewDepartment] = useState({
         dept_no: '',
         dept_name: '',
      }),
      [departmentData, setDepartmentData] = useState([]),
      [dataFetched, setDataFetched] = useState(false),
      [reset, setReset] = useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [cardClass, setCardClass] = useState('displayBlock'),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

   const [state, setState] = useState({ columns: [], data: [] });

   const getDeptDetailsStart = (dept_no) => {
      if (dept_no !== undefined) {
         if (cardClass === 'animFadeInFast' || cardClass === 'displayBlock') {
            setCardClass('animFadeOutFast');
         }
         getDeptDetails(dept_no, token).then((data) => {
            setTimeout(() => {
               setCardClass('animFadeInFast');
               setDataByDepartment(data);
               //console.log(data);
            }, 300);
         });
      }
   };

   const closeCard = () => {
      setCardClass('animFadeOutFast');
      setTimeout(() => {
         setCardClass('displayNone');
      }, 500);
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext('Loading Departments', 'info', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem('token')
         .then(function (theToken) {
            setToken(theToken);
            getDepartments(theToken).then((data) => {
               setMsgArr(cubeMsgNext('Departments Loaded', 'success', msgArr));
               setDataFetched(true);
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );

               setDepartmentData(data);

               setState({
                  columns: [
                     { title: 'Department #', field: 'dept_no' },
                     { title: 'Department Name', field: 'dept_name' },
                  ],
                  data: data,
               });
            });
         })

         .catch(function (err) {
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, [reset, msgArr, dataByDepartment]);

   return (
      <div id='main' className='body'>
         <h3>Departments</h3>
         <div style={{ padding: 25, display: 'block' }}></div>
         <div className='contain' style={{ marginLeft: 10 }}>
            <div className={'cubeWrapperFluid ' + cubeWrapperAnim} id='stage'>
               <CubeMsg
                  msgArr={msgArr}
                  width={'100%'}
                  height={78}
                  marginT={-60}
               />
            </div>
         </div>
         <div style={{ padding: 15, display: 'block' }}></div>

         <div className={cardClass} style={{ marginTop: 15, marginBottom: 2 }}>
            <DepartmentCard
               viewDepartment={viewDepartment}
               dataByDepartment={dataByDepartment}
               closeCard={closeCard}
            />
         </div>

         <br />
         <br />
         <div style={{ paddingBottom: 15 }} className={alert2Class}>
            <Alert severity={alert2Severity} variant='filled'>
               {alert2Msg}
            </Alert>
         </div>

         {!dataFetched ? (
            <CircularProgress />
         ) : (
            <DepartmentsTable
               departmentData={departmentData}
               state={state}
               msgArr={msgArr}
               token={token}
               setMsgArr={setMsgArr}
               setViewDepartment={setViewDepartment}
               setCubeWrapperAnim={setCubeWrapperAnim}
               setState={setState}
               setCardClass={setCardClass}
               cubeMsgNext={cubeMsgNext}
               getDeptDetailsStart={getDeptDetailsStart}
               setAlert2Class={setAlert2Class}
               setAlert2Msg={setAlert2Msg}
               setAlert2Severity={setAlert2Severity}
            />
         )}
      </div>
   );
};
