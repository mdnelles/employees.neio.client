import React, { useState, useEffect } from 'react';
import { login } from './UserFunctions';
import { Msg } from '../widgets/Msg';
import localForage from 'localforage';

import { useSpring, animated as a } from 'react-spring';

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
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';

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
   },
   typography: {
      padding: theme.spacing(2)
   }
}));

const AtMdNelles = () => {
   return (
      <React.Fragment>
         Author:{' '}
         <a
            href='https://github.com/mdnelles/employees.neio.client'
            target='_blank'
         >
            @mdnelles
         </a>
      </React.Fragment>
   );
};

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
      [expanded, setExpanded] = React.useState(false),
      [popAnchorEl, setPopAnchorEl] = React.useState(null);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const helpClick = (event) => {
      setPopAnchorEl(event.currentTarget);
      setMsgClass('displayNone');
   };

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
                     window.location.href = '/home';
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

   // begin popover
   const popHandleClose = () => {
      setPopAnchorEl(null);
   };

   const popOpen = Boolean(popAnchorEl);
   const popId = popOpen ? 'simple-popover' : undefined;
   // end popover

   useEffect(() => {}, []);

   const aprops1 = useSpring({
      config: { duration: 500 },
      from: { opacity: 0, marginTop: -200, scale: 0.5 },
      to: { opacity: 1, marginTop: 0, scale: 1 },
      delay: 100
   });
   const aprops2 = useSpring({
      config: { duration: 1000 },
      marginTop: 0,
      from: { marginTop: -200 }
   });

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <a.div style={aprops1}>
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
                     title='Employees App '
                     subheader=<AtMdNelles />
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
                              onChange={(event) =>
                                 setPassword(event.target.value)
                              }
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
                     ></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                     <IconButton aria-label='Help' onClick={helpClick}>
                        <HelpOutlineIcon />
                     </IconButton>
                     <Popover
                        id={popId}
                        open={popOpen}
                        anchorEl={popAnchorEl}
                        onClose={popHandleClose}
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center'
                        }}
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'center'
                        }}
                     >
                        <Typography className={classes.typography}>
                           To login use password: `nelles`
                           <br />
                           This application is for demonstration purposes. CRUD:
                           Create, Read, Update, Delete
                           <br />
                           Please feel free to manipulate the data through the
                           use of the functionality. Kindly keep it clean.
                        </Typography>
                     </Popover>

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
                        Tech Stack:
                        <List component='nav' aria-label='application stack'>
                           <ListItem button>
                              <ListItemAvatar>
                                 <Avatar
                                    alt='React'
                                    src='/img/icon/_react.png'
                                 />
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
                                 <Avatar
                                    alt='NodeJS'
                                    src='/img/icon/_node.png'
                                 />
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
            </a.div>
         </div>
      </div>
   );
};
