import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { logout } from "../UserFunctions";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EqualizerRoundedIcon from "@material-ui/icons/EqualizerRounded";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LocalAtmRoundedIcon from "@material-ui/icons/LocalAtmRounded";
import MenuIcon from "@material-ui/icons/Menu";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import StorageIcon from "@material-ui/icons/Storage";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   menuButton: {
      marginRight: 36,
   },
   hide: {
      display: "none",
   },
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
   },
   drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   drawerClose: {
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
         width: theme.spacing(9) + 1,
      },
   },
   toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}));

export default function MiniDrawer() {
   const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
      setOpen(true);
   };
   const bClick = (link) => {
      setTimeout(() => {
         window.location.href = "/" + link;
      }, 500);
   };
   const handleDrawerClose = () => {
      setOpen(false);
   };

   const icolor = "#444444";
   const fs = "30px";

   return (
      <div className={classes.root}>
         <CssBaseline />
         <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
               [classes.appBarShift]: open,
            })}
         >
            <Toolbar>
               <Grid item xs={1}>
                  <IconButton
                     color='inherit'
                     aria-label='open drawer'
                     onClick={handleDrawerOpen}
                     edge='start'
                     className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                     })}
                  >
                     <MenuIcon />
                  </IconButton>
               </Grid>
               <Grid item xs={5}>
                  <Typography variant='h6' noWrap>
                     Manage Employees App &nbsp;
                     <span style={{ fontSize: ".8em", color: "#cccccc" }}>
                        by @mdnelles
                     </span>
                  </Typography>
               </Grid>

               <Grid item xs={6}>
                  <p
                     align='right'
                     style={{ padding: "0px", marginRight: "20px" }}
                  >
                     <IconButton aria-label='delete' onClick={logout}>
                        <AccountCircleIcon style={{ fill: "white" }} />
                     </IconButton>
                  </p>
               </Grid>
            </Toolbar>
         </AppBar>
         <Drawer
            variant='permanent'
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               }),
            }}
         >
            <div className={classes.toolbar}>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                     <ChevronRightIcon />
                  ) : (
                     <ChevronLeftIcon />
                  )}
               </IconButton>
            </div>
            <Divider />
            <List component='nav' aria-label='application stack'>
               <ListItem button onClick={() => bClick("employees")}>
                  <ListItemAvatar>
                     <PersonRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Employees' />
               </ListItem>
               <ListItem button onClick={() => bClick("departments")}>
                  <ListItemAvatar>
                     <AccountTreeRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Deptartments' />
               </ListItem>
               <ListItem button onClick={() => bClick("dept_manager")}>
                  <ListItemAvatar>
                     <SupervisorAccountRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Department Managers' />
               </ListItem>
               <ListItem button onClick={() => bClick("titles")}>
                  <ListItemAvatar>
                     <AssignmentIndRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Title' />
               </ListItem>
               <ListItem button onClick={() => bClick("salaries")}>
                  <ListItemAvatar>
                     <LocalAtmRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Salaries' />
               </ListItem>

               <ListItem button onClick={() => bClick("stats")}>
                  <ListItemAvatar>
                     <EqualizerRoundedIcon
                        style={{ fontSize: fs, fill: icolor }}
                     />
                  </ListItemAvatar>
                  <ListItemText primary='Statistics' />
               </ListItem>

               <Divider />

               <ListItem button onClick={() => bClick("users")}>
                  <ListItemAvatar>
                     <StarsRoundedIcon style={{ fontSize: fs, fill: icolor }} />
                  </ListItemAvatar>
                  <ListItemText primary='Admin Users' />
               </ListItem>

               <ListItem button onClick={() => bClick("logs")}>
                  <ListItemAvatar>
                     <StorageIcon style={{ fontSize: fs, fill: icolor }} />
                  </ListItemAvatar>
                  <ListItemText primary='App Logs' />
               </ListItem>
            </List>
         </Drawer>
      </div>
   );
}
