import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSpring, animated as a } from 'react-spring';

const ms = {
   marginTop: 5,
   marginBottom: 5
};

//      from={{ opacity: 0, marginTop: -500 }}
// to={{ opacity: 1, marginTop: 0 }}

export const Msg = (props) => {
   const aprops = useSpring({
      marginTop: 0,
      from: { marginTop: -200 }
   });
   let alertTitle = props.alertColor.replace(/^./, (str) => str.toUpperCase());
   return (
      <a.div style={aprops}>
         <div className={props.msgClass} style={ms}>
            <div className={props.spinnerClass}>
               <CircularProgress />
            </div>
            <Alert severity={props.alertColor}>
               <AlertTitle>{alertTitle}</AlertTitle>
               {props.msg}
            </Alert>
         </div>
      </a.div>
   );
};
