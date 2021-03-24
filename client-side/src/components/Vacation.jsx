import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Badge } from '@material-ui/core';
import DelVacation from './DelVacation';
import EditVacation from './EditVacation';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    // margin: theme.spacing(2),
  },
  media: {
    width: 330,
    height: 0,
    paddingTop: '60.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Vacation({vacation, trigger,likes,setLikes}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const user = useSelector(state => state.user)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleLike = () => {
    
    if (likes){
      fetch('http://localhost:1000/user/dis_like/' + user.id, {
        method: 'POST',
        headers:{"content-type":"application/json", "Authorization":localStorage.token},
        body: JSON.stringify({ vacation_id: vacation.id })
      })
        
      setLikes(!trigger)
    }else{
      fetch('http://localhost:1000/user/add_like/' + user.id, {
          method: 'POST',
          headers:{"content-type":"application/json", "Authorization":localStorage.token},
          body: JSON.stringify({ vacation_id: vacation.id })
        })
          setLikes(!trigger)
    }
  };

  




  return (

    <Card className={classes.root} >
      <CardHeader
        title={vacation.description.slice(0, 21)}
        subheader={vacation.destination.slice(0, 25)}
      />
      <CardMedia
        className={classes.media}
        image={vacation.image_src}
        title={vacation.description}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Only <strong>{vacation.price}</strong>€
        </Typography>
      </CardContent>  
      <CardActions disableSpacing >
        {!user.role ?
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color={likes ? "secondary" : "inherit"}/>
        </IconButton>:
        <>
        <DelVacation vacation={vacation} setlikes={setLikes} trigger={trigger}/>
        <EditVacation vacation={vacation} setlikes={setLikes} trigger={trigger}/>
        </>
        
            }

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {vacation.description}
        </Typography>
          <Typography paragraph>
          departure: <br/>        
          {moment(vacation.departure).format('MMMM Do YYYY')}
 
          </Typography>
          <Typography paragraph>
          arrival: <br/>
          {moment(vacation.arrival).format('MMMM Do YYYY')}
          </Typography>
         <Badge badgeContent={vacation.likes} color="secondary">
        <FavoriteIcon color="inherit"/>
        </Badge>

        </CardContent>
      </Collapse>
    </Card>
  );
}