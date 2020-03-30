import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

const Square = () => {
   return <div style={{ height: 50, width: 50, background: 'red' }} />;
};

export const Three = () => {
   const [squareWrapperAnim, setSquareWrapperAnim] = React.useState(
      'flipAnimFwd'
   );

   function butClick() {
      let anim =
         squareWrapperAnim === 'flipAnimFwd' ? 'flipAnimBack' : 'flipAnimFwd';
      setSquareWrapperAnim(anim);
      console.log(anim);
   }

   React.useEffect(() => {
      console.log('inside useEffect');
   }, [squareWrapperAnim]);

   return (
      <div style={{ padding: 100 }}>
         <div className={squareWrapperAnim}>
            <Square />
         </div>
         <br />

         <button onClick={butClick}>trigger flip</button>
      </div>
   );
};

ReactDOM.render(<Three />, document.getElementById('root'));
