
import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import AlertBox from './AlertBox';
import EditIcon from '@material-ui/icons/Edit';





export default function EditVacation({vacation, setlikes, trigger}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()
  const user = useSelector(state => state.user)
  const [errorMsg,setErrorMsg] = useState('')
  const [successMsg,setSuccessMsg] = useState('')
  const [description, setDescription] = useState(vacation.description)
  const [destination, setDestination] = useState(vacation.destination)
  const [image_src, setImage_src] = useState(vacation.image_src)
  const [departure, setDeparture] = useState(vacation.departure)
  const [arrival, setArrival] = useState(vacation.arrival)
  const [price, setPrice] = useState(vacation.price)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setErrorMsg(false)
    setSuccessMsg(false)
    setAnchorEl(null);
  };



  const handleEdit = async e => {
    e.preventDefault()
    try {
        let res = await fetch("http://localhost:1000/user/admin/edit/" + vacation.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({ description, destination, image_src, departure, arrival,price })
        })
        let data = await res.json()
        if (res.status === 201) {
            setErrorMsg(false)
            setSuccessMsg(data.msg)
            setlikes(!trigger)
            setlikes(!trigger)
            setTimeout(()=> {handleClose()} , 2000)
        } else if (res.status === 400) {
            setErrorMsg(data.msg)
        } 
    } catch (error) {

    }
}



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          <EditIcon color="primary" />
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
                <div className="add_container">
            {user.login && user.role === 1 ? <>
                <Typography variant="h4">Edit vacation No.{vacation.id}</Typography>
                <Paper >
                    <form className="add_inputs" onSubmit={handleEdit}>
                        <TextField onChange={e => { setDescription(e.target.value) }} label="vacation description" defaultValue={vacation.description}/>
                        <TextField onChange={e => { setDestination(e.target.value) }} label="vacation destination" defaultValue={vacation.destination}/>
                        <TextField onChange={e => { setImage_src(e.target.value) }} label="Image Url" defaultValue={image_src}/>
                        <TextField onChange={e => { setDeparture(e.target.value) }}  type="date" helperText="Departure date" defaultValue={vacation.departure.slice(0, 10)}/>
                        <TextField onChange={e => { setArrival(e.target.value) }} type="date" helperText="Arrival date" defaultValue={vacation.arrival.slice(0, 10)}/>
                        <TextField onChange={e => { setPrice(e.target.value) }} type="number" helperText="Price" defaultValue={vacation.price}/>
                {errorMsg && <AlertBox message={errorMsg} type="error"/>}
                {successMsg && <AlertBox message={successMsg} type="success"/>}
                        <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                    </form>
                </Paper>
            </> : history.push('/')}
        </div>

      </Popover>
    </div>
  );
}








