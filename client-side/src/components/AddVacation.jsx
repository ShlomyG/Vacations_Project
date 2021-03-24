import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import AlertBox from './AlertBox';




export default function AddVacation() {
    const user = useSelector(state => state.user)
    const [errorMsg,setErrorMsg] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [description, setDescription] = useState('')
    const [destination, setDestination] = useState('')
    const [image_src, setImage_src] = useState('')
    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [price, setPrice] = useState('')
  
    let history = useHistory();
    const handleAdd = async e => {
        e.preventDefault()
        try {
            let res = await fetch("http://localhost:1000/user/admin/add", {
                method: 'POST',
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
                setTimeout(()=> {history.push('/vacations')} , 2500)
            } else if (res.status === 400) {
                setErrorMsg(data.msg)
            } 
        } catch (error) {

        }
    }

    return (
        <div className="add_container">
            {user.login && user.role === 1 ? <>
                <Typography variant="h2">New vacation</Typography>
                <Typography variant="h5">Dear Admin,<br/> please insert all the details to add a vacation</Typography>
                <Paper >
                    <form className="add_inputs" onSubmit={handleAdd}>
                        <TextField onChange={e => { setDescription(e.target.value) }} label="vacation description" />
                        <TextField onChange={e => { setDestination(e.target.value) }} label="vacation destination" />
                        <TextField onChange={e => { setImage_src(e.target.value) }} label="Image Url" />
                        <TextField onChange={e => { setDeparture(e.target.value) }} type="date" helperText="Departure date" />
                        <TextField onChange={e => { setArrival(e.target.value) }} type="date" helperText="Arrival date" />
                        <TextField onChange={e => { setPrice(e.target.value) }} type="number" helperText="Price" />
                {errorMsg && <AlertBox message={errorMsg} type="error"/>}
                {successMsg ? <AlertBox message={successMsg} type="success"/> :
                        <Button variant="outlined" color="primary" onClick={handleAdd}>Add</Button>}
                        <Button variant="outlined" color="secondary" onClick={()=>{history.push('/vacations')}}>Back</Button>
                    </form>
                </Paper>
            </> : history.push('/')}
        </div>
    )
}


