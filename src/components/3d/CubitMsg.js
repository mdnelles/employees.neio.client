import React from 'react';

export const CubitMsg = (props) => {
   console.log('rendering cubit');
   return (
      <React.Fragment>
         <div id='tridiv'>
            <div className='scene'>
               <div className='shape cuboid-1 cub-1'>
                  <div className='face ft'>
                     <div className='photon-shader'>{props.front}</div>
                  </div>
                  <div className='face bk'>
                     <div className='photon-shader'>{props.back}</div>
                  </div>
                  <div className='face rt'>
                     <div className='photon-shader'>{props.right}</div>
                  </div>
                  <div className='face lt'>
                     <div className='photon-shader'>{props.left}</div>
                  </div>
                  <div className='face bm'>
                     <div className='photon-shader'>{props.bottom}</div>
                  </div>
                  <div className='face tp'>
                     <div className='photon-shader'>{props.top}</div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
