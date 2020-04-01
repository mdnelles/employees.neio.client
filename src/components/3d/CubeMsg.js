import React from 'react';
import { CubeSide } from './CubeSide';
import { Msg } from '../widgets/Msg';

export const CubeMsg = (props) => {
   //console.log('rendering cubit');
   return (
      <div
         style={{
            width: props.width,
            height: props.height,
            marginTop: props.marginT
         }}
      >
         <CubeSide id='roll0' width={props.width}>
            <Msg
               msg={props.msgArr[0].msg}
               alertColor={props.msgArr[0].alertColor.toLowerCase()}
               width={props.width}
            />
         </CubeSide>
         <CubeSide id='roll1' width={props.width}>
            <Msg
               msg={props.msgArr[1].msg}
               alertColor={props.msgArr[1].alertColor.toLowerCase()}
               width={props.width}
            />
         </CubeSide>

         <CubeSide id='roll2' width={props.width}>
            <Msg
               msg={props.msgArr[2].msg}
               alertColor={props.msgArr[2].alertColor.toLowerCase()}
               width={props.width}
            />
         </CubeSide>
         <CubeSide id='roll3' width={props.width}>
            <Msg
               msg={props.msgArr[3].msg}
               alertColor={props.msgArr[3].alertColor.toLowerCase()}
               width={props.width}
            />
         </CubeSide>
      </div>
   );
};
