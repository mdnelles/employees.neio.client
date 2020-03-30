import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

const ms = {
   marginTop: 5,
   marginBottom: 5
};

export const Msg = (props) => {
   let alertTitle = props.alertColor.replace(/^./, (str) => str.toUpperCase());
   console.log('in msg');
   return (
      <div className={props.msgClasses.join(' ')}>
         <div className={props.msgClass} style={ms}>
            <div className={props.spinnerClass}>
               <CircularProgress />
            </div>
            <Alert severity={props.alertColor}>
               <AlertTitle>{alertTitle}</AlertTitle>
               {props.msg}
            </Alert>
         </div>
      </div>
   );
};
