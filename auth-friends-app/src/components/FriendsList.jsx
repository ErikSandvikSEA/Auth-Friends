import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth' 
import Friend from './Friend'

//styling imports
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

//styling function
const useStyles = makeStyles((theme) => ({
     icon: {
       marginRight: theme.spacing(2),
     },
     heroContent: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(8, 0, 6),
     },
     cardGrid: {
       paddingTop: theme.spacing(8),
       paddingBottom: theme.spacing(8),
     },
     card: {
       height: '100%',
       display: 'flex',
       flexDirection: 'column',
     },
     cardMedia: {
       paddingTop: '56.25%', // 16:9
     },
     cardContent: {
       flexGrow: 1,
     },
     footer: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(6),
     },
   }));
   //end styling functions
   
const FriendsList = () => {
     //styling classes
     const classes = useStyles();
     //placeholder data
     const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

     //setting up friends state
     const [friends, setFriends] = useState([])

    //function for api call
    const getFriends = () => {
      axiosWithAuth()
        .get('/api/friends')
        .then(response => {
          console.log(response.data)
          setFriends(
            response.data
          )
        })
    }

    //set friends on page render
    useEffect(() => {
      getFriends()
    }, [])


     return(
     <React.Fragment>
     <CssBaseline />
     <main>
       {/* Hero unit */}
       <div className={classes.heroContent}>
         <Container maxWidth="sm">
           <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
             Friends
           </Typography>
         </Container>
       </div>
        {/* End hero unit */}
       <Container className={classes.cardGrid} maxWidth="md">
         <Grid container spacing={4}>
           {friends.map((friend) => (
             <Friend friend={friend} key={friend.id}/>
           ))}
         </Grid>
       </Container>
     </main>
   </React.Fragment>
 );
}

export default FriendsList