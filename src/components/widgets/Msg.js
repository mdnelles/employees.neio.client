import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const ms = {
   marginTop: 5,
   marginBottom: 5
};

export const Msg = (props) => {
   let alertTitle = props.alertColor.replace(/^./, (str) => str.toUpperCase());
   //console.log('in msg');
   return (
      <div style={{ width: props.width }}>
         <div style={ms} style={{ width: props.width }}>
            <Alert severity={props.alertColor} variant='filled'>
               <AlertTitle>{alertTitle}</AlertTitle>
               {props.msg}
            </Alert>
         </div>
      </div>
   );
};
