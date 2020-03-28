import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

const ms = {
   marginTop: 3,
   marginBottom: 3
};

export const Msg = (props) => {
   let alertTitle = props.alertColor.replace(/^./, (str) => str.toUpperCase());
   return (
      <div className={props.msgClass} style={ms}>
         <div className={props.spinnerClass}>
            <CircularProgress />
         </div>
         <Alert severity={props.alertColor}>
            <AlertTitle>{alertTitle}</AlertTitle>
            {props.msg}
         </Alert>
      </div>
   );
};
