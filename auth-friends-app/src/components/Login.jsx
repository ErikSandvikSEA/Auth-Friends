import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//styling imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//styling function
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
//end styling function






export default function SignIn() {
  //add styling classes
  const classes = useStyles();

  //add history from the useHistory hook
  let history = useHistory()
  

  //set credentials to state
  const [credentials, setCredentials] = useState({
       username: '',
       password: '',
  })

  //add isLoading state
  const [isLoading, setIsLoading] = useState(false)

  //handle changes to input values and set them to credentials state object
  const handleChange = e => {
       setCredentials({
            ...credentials,
               [e.target.name]: e.target.value
       })
     //   console.log(credentials)
  }

  //set up login click handler w/axios post
  const login = e => {
       e.preventDefault()
     // make a POST request to the login endpoint
     // _if_ the creds match what's in the database, the server will return a JSON web token
     // set the token to localStorage (sessions)
     // navigate the user to the "/protected" route
     axiosWithAuth()
          .post('/api/login', credentials)
          .then(response => {
               console.log(response)
               //response.data.payload is the key that comes from server.js
               localStorage.setItem('token', response.data.payload)
               history.push('/protected')
          })
          .catch(err => {
               console.log(err)
               alert('Invalid Email or Password')
          })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            type='text'
            name='username'
            onChange={handleChange}
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
            name='password'
            onChange={handleChange}
          />
          <Button
            onClick={login}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}