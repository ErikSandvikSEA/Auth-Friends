import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//styling
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'


import Login from './components/Login'
import Friends from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'

//styling function
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
    <div className="App">
      <header className={classes.root}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
          <Button variant='outlined'>
          <Link to='/login'>
          <Typography variant="h6" className={classes.title}>
              Log In
            </Typography>
          </Link>
          </Button>
          <Button variant='outlined'>
          <Link to='/protected'>
            <Typography variant="h6" className={classes.title}>
              Protected Friends Page
            </Typography>
          </Link>
          </Button>
            
          </Toolbar>
        </AppBar>
      </header>

      <Switch>
        <PrivateRoute exact path='/protected' component={Friends} />
        <Route path='/login' component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
