import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    marginRight: theme.spacing(2),

  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function HeaderBar() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()



  const classes = useStyles();

  function handleLogout(){
    localStorage.removeItem("token")
    dispatch({type:"LOGOUT"})
    history.push("/login")
  
  
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        <Avatar className={classes.orange}>{user.fname && user.fname.slice(0, 1)}</Avatar>

          <Typography className={classes.title} variant="h5" noWrap >
              Travel Project By Shlomy Gerstner
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {user.role === 1 && <>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <AddCircleOutlineIcon titleAccess="Add Vacation" onClick={() => { history.push('/add') }} />
            </IconButton>
            <IconButton color="inherit">
              <EqualizerIcon titleAccess="Followers Chart" onClick={() => { history.push('/chart') }}/> 
            </IconButton>
            <IconButton color="inherit">
              <HomeIcon titleAccess="Home Page" onClick={() => { history.push('/vacations') }}/> 
            </IconButton>
            </>}
            <IconButton aria-label="show 4 new mails" color="inherit">
                <ExitToAppTwoToneIcon titleAccess="LogOut" onClick={handleLogout} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
