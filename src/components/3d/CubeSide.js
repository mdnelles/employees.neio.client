import React from 'react';

export const CubeSide = (props) => {
   return (
      <div id={props.id} className='cubeFace' style={{ width: props.width }}>
         {props.children}
      </div>
   );
};
