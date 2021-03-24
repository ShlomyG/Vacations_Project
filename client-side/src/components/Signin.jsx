import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import {useDispatch} from "react-redux";
import React , {useState} from "react"
import {Link as RouterLink} from 'react-router-dom'
import AlertBox from './AlertBox';



const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/user/shlomyg7/likes)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  export default function Signin({history})
{
  const classes = useStyles();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('')
    const [successMsg,setSuccessMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch("http://localhost:1000/actions/register", {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({fname, lname, username, password})
            })
            let data = await res.json()
            if (data.error){
                    setErrorMsg(data.msg)
            }else{
                // localStorage.token=data.access_token
                setErrorMsg(false)
                setSuccessMsg(data.msg)
                setTimeout(()=> {history.push('/login')} , 2500)

                
            }
            
        } catch (err) {
          setErrorMsg(err)
            
        }
        
    }
    return(
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to Travel Project
            </Typography>
            <Typography component="h2" variant="h5">
              Please insert your details to create new member
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fname"
                label="First Name"
                name="fname"
                autoComplete="FirstName"
                autoFocus
                onChange={e => setFname(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="LastName"
                autoFocus
                onChange={e => setLname(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="UserName"
                autoFocus
                onChange={e => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
               {errorMsg && <AlertBox message={errorMsg} type="error"/>}
                {successMsg && <AlertBox message={successMsg} type="success"/>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link  component={RouterLink} to="/login" variant="body2">
                    {"Do you have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
  







        // <form onSubmit={handleSubmit}>
        //         <span>{error}</span>
        // <input type="text" name="username" placeholder="fname" value="username" onChange={e => setFname(e.target.value)}/>
        // <input type="password" name="password" placeholder="lname" onChange={e => setLname(e.target.value)}/>
        // <input type="text" name="username" placeholder="User Name" value="username" onChange={e => setUsername(e.target.value)}/>
        // <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        // <button type="submit" name="login">Login</button>
        // </form>


    )


}

