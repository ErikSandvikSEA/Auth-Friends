import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//styling imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


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
       setIsLoading(true)
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
               setIsLoading(false)
               history.push('/protected')
          })
          .catch(err => {
               console.log(err)
               alert('Invalid Email or Password')
               setIsLoading(false)
          })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img width="43" height="43"src='data:image/png;base64,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' />
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
            autoComplete='username'

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
            name='password'
            autoComplete='current-password'
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
          <Typography>
               For this example, enter:
          </Typography>
          <Typography>
               Username: 'real username'
          </Typography>
          <Typography>
          Password: 'asdf'
          </Typography>
          {isLoading && <CircularProgress />}

        </form>
      </div>
    </Container>
  );
}