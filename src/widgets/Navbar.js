import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { logout } from '../components/UserFunctions';

const Space = () => {
   return <span> &nbsp; </span>;
};

export const Navbar = () => {
   const handleClick = (event) => {
      console.log('bring out the drawer');
   };

   return (
      <div className='navAppBar'>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <div>
                  <Button
                     aria-controls='simple-menu'
                     aria-haspopup='true'
                     onClick={handleClick}
                  >
                     <MenuIcon style={{ fill: 'white' }} />
                  </Button>
               </div>
            </Grid>

            <Grid item xs={12} sm={6}>
               <div
                  style={{
                     width: '100%',
                     textAlign: 'right',
                     marginRight: 25
                  }}
               >
                  <HomeIcon
                     className='pointer'
                     style={{ fill: 'white', marginTop: 10 }}
                     onClick={() => (window.location.href = '/home')}
                  />
                  <AccountCircleIcon
                     className='pointer'
                     style={{ fill: 'white', marginTop: 10 }}
                     onClick={logout}
                  />
                  <Space />
               </div>
            </Grid>
         </Grid>
      </div>
   );
};
