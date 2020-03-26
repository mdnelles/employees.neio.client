import React, { useState, useEffect } from 'react';
import { login } from './UserFunctions';
import { Msg } from './CustomWidget';

import localForage from 'localforage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 345
   },
   media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
   },
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest
      })
   },
   expandOpen: {
      transform: 'rotate(180deg)'
   },
   avatar: {
      backgroundColor: red[500]
   }
}));

function ListItemLink(props) {
   return <ListItem button component='a' {...props} />;
}

export const Landing = () => {
   const classes = useStyles();

   const [email, setEmail] = useState('mxnelles@gmail.com'),
      [password, setPassword] = useState(''),
      [msg, setMsg] = useState('Enter valid credentials to proceed'),
      [alertColor, setAlertColor] = useState('info'),
      [msgClass, setMsgClass] = useState('displayBlock'),
      [spinnerClass, setSpinnerClass] = useState('displayNone'),
      [expanded, setExpanded] = React.useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };
   const vertClick = () => {
      console.log('in vert click');
   };

   const helpClick = () => {};

   function butClick(e) {
      console.log('button clicked');
      e.preventDefault();
      setSpinnerClass('displayBlock');
      setAlertColor('info');
      setMsgClass('displayBlock');
      setMsg('Checking credentials...');
      const user = {
         email: email,
         password: password
      };

      if (
         email === null ||
         email === undefined ||
         email === '' ||
         password === null ||
         password === undefined ||
         password === ''
      ) {
         setSpinnerClass('displayNone');
         setMsg('Please ender valid login credentials');
         setAlertColor('error');
      } else {
         localForage.setItem('token', false); // clear old token if exists
         login(user)
            .then((res) => {
               if (parseInt(res) !== null) {
                  localForage.setItem('token', res);

                  setTimeout(() => {
                     window.location.href = '/add';
                  }, 1000);
               } else {
                  console.log('+++ unhandled error here: ' + __filename);
                  setSpinnerClass('displayNone');
                  setMsg('Login Failed');
               }
            })
            .catch((err) => {
               console.log('+++ error in file: ' + __filename + 'err=' + err);
            });
      }
   }

   useEffect(() => {}, []);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <Msg
               msgClass={msgClass}
               spinnerClass={spinnerClass}
               msg={msg}
               alertColor={alertColor}
            />
            <Card className={classes.root}>
               <CardHeader
                  avatar={
                     <Avatar aria-label='recipe' className={classes.avatar}>
                        E
                     </Avatar>
                  }
                  action={
                     <IconButton aria-label='settings' onClick={vertClick}>
                        <MoreVertIcon />
                     </IconButton>
                  }
                  title='Nelles App '
                  subheader='CRUD Employees'
               />
               <CardMedia
                  className={classes.media}
                  image='/img/employees3.jpg'
                  title='Employees'
               />
               <CardContent>
                  <form>
                     <div className='center-inner' style={{ padding: 10 }}>
                        <TextField
                           label='email'
                           ariant='outlined'
                           defaultValue={email}
                           onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                           label='Password'
                           ariant='outlined'
                           defaultValue={password}
                           onChange={(event) => setPassword(event.target.value)}
                        />
                        <br />
                        <br />
                        <Button
                           variant='contained'
                           color='primary'
                           onClick={butClick}
                        >
                           Login
                        </Button>
                     </div>
                  </form>
                  <Typography
                     variant='body2'
                     color='textSecondary'
                     component='p'
                  >
                     This application is for testing & to demonstrate
                     competence. Please feel free to manipulate the data through
                     the use of the CRUD functionality. Kindly keep it clean.
                  </Typography>
               </CardContent>
               <CardActions disableSpacing>
                  <IconButton aria-label='Help' onClick={helpClick}>
                     <HelpOutlineIcon />
                  </IconButton>

                  <IconButton
                     className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded
                     })}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label='show more'
                  >
                     <ExpandMoreIcon />
                  </IconButton>
               </CardActions>
               <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                     Tech:
                     <List component='nav' aria-label='application stack'>
                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar alt='React' src='/img/icon/_react.png' />
                           </ListItemAvatar>
                           <ListItemText primary='React' />
                        </ListItem>
                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar
                                 alt='ExpressJS'
                                 src='/img/icon/_express2.png'
                              />
                           </ListItemAvatar>
                           <ListItemText primary='Express' />
                        </ListItem>
                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar alt='NodeJS' src='/img/icon/_node.png' />
                           </ListItemAvatar>
                           <ListItemText primary='NodeJS' />
                        </ListItem>
                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar
                                 alt='Material US'
                                 src='/img/icon/_material.png'
                              />
                           </ListItemAvatar>
                           <ListItemText primary='Material UI' />
                        </ListItem>
                        <ListItem button>
                           <ListItemAvatar>
                              <Avatar
                                 alt='MySQL Database'
                                 src='/img/icon/_mysql.png'
                              />
                           </ListItemAvatar>
                           <ListItemText primary='MySQL' />
                        </ListItem>
                        <ListItem button disableGutters={true}>
                           <ListItemLink href='https://github.com/mdnelles'>
                              <ListItemAvatar>
                                 <Avatar
                                    alt='Github'
                                    src='/img/icon/_github.png'
                                 />
                              </ListItemAvatar>
                              <ListItemText primary='GitHub' />
                           </ListItemLink>
                        </ListItem>
                     </List>
                  </CardContent>
               </Collapse>
            </Card>
         </div>
      </div>
   );
};
