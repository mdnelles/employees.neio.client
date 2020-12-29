import React, { useState, useEffect } from 'react';
import { getTitles } from './TitleFunctions';
import localForage from 'localforage';

import Alert from '@material-ui/lab/Alert';
import { cubeMsgNext, obj } from './_sharedFunctions';
import { CubeMsg } from './3d/CubeMsg';
import { TitlesTable } from './tables/TitlesTable';
import { TitleCard } from './TitleCard';

import CircularProgress from '@material-ui/core/CircularProgress';

export const Titles = () => {
   const [open, setOpen] = useState(false),
      [alert2Severity, setAlert2Severity] = useState('warning'),
      [alert2Msg, setAlert2Msg] = useState(''),
      [alert2Class, setAlert2Class] = useState('displayNone'),
      [token, setToken] = useState('no token'),
      [dataByTitle, setDataByTitle] = useState([]),
      [viewTitle, setViewTitle] = useState({
         dept_no: '',
         dept_name: '',
      }),
      [titleData, setTitleData] = useState([]),
      [dataFetched, setDataFetched] = useState(false),
      [reset, setReset] = useState(false),
      [msgArr, setMsgArr] = useState(obj),
      [cardClass, setCardClass] = useState('displayBlock'),
      [cubeWrapperAnim, setCubeWrapperAnim] = useState([]);

const flex = React.useRef(false);

   const [state, setState] = useState({ columns: [], data: [] });

   const closeCard = () => {
      setCardClass('animFadeOutFast');
      setTimeout(() => {
         setCardClass('displayNone');
      }, 500);
   };

   useEffect(() => {
      setMsgArr(cubeMsgNext('Loading Titles', 'info', msgArr));
      setCubeWrapperAnim(
         msgArr[msgArr.findIndex((el) => el.current === true)].anim
      );
      localForage
         .getItem('token')
         .then(function (theToken) {
            setToken(theToken);
            getTitles(theToken).then((data) => {
               setMsgArr(cubeMsgNext('Titles Loaded', 'success', msgArr));
               setDataFetched(true);
               setCubeWrapperAnim(
                  msgArr[msgArr.findIndex((el) => el.current === true)].anim
               );

               setTitleData(data);

               setState({
                  columns: [{ title: 'Title Name', field: 'title' }],
                  data: data,
               });
            });
         })

         .catch(function (err) {
            console.log(err);
            alert('no token found');
            window.location.href = '/';
         });
   }, [reset, msgArr, dataByTitle]);

   return (
      <div id='main' className='body'>
         <h3>Titles</h3>
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
            <TitlesTable
               titleData={titleData}
               state={state}
               msgArr={msgArr}
               token={token}
               setMsgArr={setMsgArr}
               setViewTitle={setViewTitle}
               setCubeWrapperAnim={setCubeWrapperAnim}
               setState={setState}
               setCardClass={setCardClass}
               cubeMsgNext={cubeMsgNext}
               setAlert2Class={setAlert2Class}
               setAlert2Msg={setAlert2Msg}
               setAlert2Severity={setAlert2Severity}
            />
         )}
      </div>
   );
};
