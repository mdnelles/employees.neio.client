import React from 'react';
import { CubeSide } from './CubeSide';
//import { Msg } from './widgets/Msg';

export const Cube = (props) => {
   //console.log('rendering cubit');
   return (
      <React.Fragment>
         <CubeSide id='side1'>here1</CubeSide>
         <CubeSide id='side3'>here3</CubeSide>
         <CubeSide id='side5'>here5</CubeSide>
         <CubeSide id='side6'>here 6</CubeSide>
      </React.Fragment>
   );
};
