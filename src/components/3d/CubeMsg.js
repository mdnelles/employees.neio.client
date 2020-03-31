import React from 'react';
import { CubeSide } from './CubeSide';
import { Msg } from '../widgets/Msg';

export const CubeMsg = (props) => {
   //console.log('rendering cubit');
   return (
      <div style={{ width: props.width, height: props.height }}>
         <CubeSide id='side3' width={props.width}>
            <Msg
               msgClass={props.msgClass1}
               spinnerClass={props.spinnerClass1}
               msg={props.msg1}
               alertColor={props.alertColor1}
               msgClasses={props.msgClasses1}
               width={props.width}
            />
         </CubeSide>
         <CubeSide id='side6' width={props.width}>
            <Msg
               msgClass={props.msgClass1}
               spinnerClass={props.spinnerClass1}
               msg={props.msg1}
               alertColor={props.alertColor1}
               msgClasses={props.msgClasses1}
               width={props.width}
            />
         </CubeSide>
      </div>
   );
};
