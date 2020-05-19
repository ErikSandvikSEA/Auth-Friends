import React, { useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth' 

//styling imports
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
   
const Friend = (props) => {
     const { friend } = props
     //styling classes
     const classes = useStyles();

     //placeholder data
     const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];




     return(
     <React.Fragment>
          <Grid item key={friend.id} xs={12} sm={6} md={4}>
               <Card className={classes.card}>
                 <CardMedia
                   className={classes.cardMedia}
                   image={friend.image}
                   title="Image title"
                 />
                 <CardContent className={classes.cardContent}>
                   <Typography gutterBottom variant="h5" component="h2">
                     {friend.name}
                   </Typography>
                   <Typography>
                     Age: {friend.age}
                   </Typography>
                   <Typography>
                     Email: {friend.email}
                   </Typography>
                 </CardContent>
                 {/* <CardActions>
                   <Button size="small" color="primary">
                     View
                   </Button>
                   <Button size="small" color="primary">
                     Edit
                   </Button>
                 </CardActions> */}
               </Card>
             </Grid>
   </React.Fragment>
 );
}

export default Friend