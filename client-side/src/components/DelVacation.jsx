
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
      root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  typography: {
    padding: theme.spacing(2),
  },
}));

export default function DelVacation({vacation, setlikes, trigger}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
      try { 
        let res = await fetch("http://localhost:1000/user/admin/" + vacation.id, {
            method: "DELETE",
            headers: {  'Content-Type': 'application/json', 'Authorization': localStorage.token }
        })
        let data = await res.json()
        if (res.status===200){
        
            setlikes(!trigger)

        }else{
            alert(data.msg)}
      } catch (error) {
            throw error
      }
    
}


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          <DeleteIcon color="secondary" />
        </IconButton>
      <Popover 
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Are you sure you want to remove "{vacation.description.slice(0, 21)}"? </Typography>
             <div className={classes.root}> 
             <Button  variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button> </div>
      </Popover>
    </div>
  );
}