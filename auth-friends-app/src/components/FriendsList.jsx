import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth' 
import Friend from './Friend'

//styling imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


//styling function
const useStyles = makeStyles((theme) => ({
     icon: {
       marginRight: theme.spacing(2),
     },
     heroContent: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(8, 0, 6),
     },
     alignedCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

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

     //setting up friends state
     const [friends, setFriends] = useState([])

     //spinner
     const [isLoading, setIsLoading] = useState(true)

     //setting up formValues state
     const [formValues, setFormValues] = useState({
       name: '',
       age: '',
       email: '',
       id: '',
  })

    //function for api call
    const getFriends = () => {
      axiosWithAuth()
        .get('/api/friends')
        .then(response => {
          // console.log(response.data)
          setIsLoading(false)
          setFriends(
            response.data
          )
        })
    }

    //set friends on page render
    useEffect(() => {
      getFriends()
    }, [])

     //handle changes to input values and set them to formValues state object
    const handleFormChange = e => {
      setFormValues({
          ...formValues,
              [e.target.name]: e.target.value,
              id: Date.now()
      })
      // console.log(formValues)
    }

    //handle adding friend post request
    const addFriend = e => {
      e.preventDefault()
      axiosWithAuth()
        .post('/api/friends', formValues)
        .then(response => {
          setFriends(response.data)
          setIsLoading(false)
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    //live-render the new friend
    // useEffect(() => {
    //   getFriends()
    // }, [addFriend])

     return(
     <React.Fragment>
     <CssBaseline />
     <main>
       {/* Hero unit */}
       <div className={classes.heroContent}>
         <Container maxWidth="sm" className={classes.alignedCenter}>
           <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
             Friends
           </Typography>
           <input 
            type='text'
            name='name'
            placeholder='Name'
            onChange={handleFormChange}
           />
           <input 
            type='text'
            name='age'
            placeholder='Age'
            onChange={handleFormChange}
           />
           <input 
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleFormChange}
           />
           <input 
            type='text'
            name='image'
            placeholder='Image URL'
            onChange={handleFormChange}
           />
           <Button 
            variant='contained' 
            color='secondary'
            onClick={addFriend}
            >
              Add a friend
            </Button>
         </Container>
         
       </div>
       
        {/* End hero unit */}
       <Container className={classes.cardGrid} maxWidth="md">
         <Grid container spacing={4}>
           {isLoading && <CircularProgress />}
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