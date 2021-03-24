import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search'
import { InputAdornment } from "@material-ui/core";
import 'date-fns';
import AlertBox from './AlertBox';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';



export default function SearchBar({
    setLikeVacations,
    setUnLikeVacations,
    setSearchedVacations,
    likeVacations,
    unLikeVacations
}) {

    const [descriptionSearch, setDescriptionSearch] = useState('')
    const [departureSearch, setDepartureSearch] = useState('')
    const [arrivalSearch, setArrivalSearch] = useState('')
    const [error, setError] = useState('')
    const styles = useStyles();


    const 
    handleSearchVacation = async () => {
        try {
            let res = await fetch( 'http://localhost:1000/user/vacation_search', {
                method: "POST",
                headers: {
                    Authorization: localStorage.token,
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        descriptionSearch,
                        departureSearch,
                        arrivalSearch
                    })
            })
            let data = await res.json()
            if (data.length > 0) {
                
                // setLikeVacations([])
                // setUnLikeVacations([])
                setSearchedVacations(data)
            } else {
                setError('No results found, Try Again')
                setTimeout(() => {
                    setError('')
                }, 3500);
            }
        } catch (error) {
            throw error
        }
    }

    const handleClear = () => {
        setSearchedVacations([])
        setDescriptionSearch('')
    }

    return (<>
    <div className="search_container">
                <div className="search_form" >
                    <TextField className={styles.search} id="outlined-basic" label="Search" value={descriptionSearch} onChange={e => { setDescriptionSearch(e.target.value) }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField onChange={e => { setDepartureSearch(e.target.value) }} label="departure" type="date" value={departureSearch} InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField onChange={e => { setArrivalSearch(e.target.value) }}
                        label="arrival"
                        type="date"
                        value={arrivalSearch}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button className={styles.buttons} variant="contained" color="primary" size="small" onClick={handleSearchVacation}>
                        search
                     </Button>
                    <Button className={styles.buttons} variant="outlined" color="primary" size="small" onClick={handleClear}>
                        Clear
                     </Button>
                </div>
                {error && <AlertBox type='info' message={error} />}
            </div>
    
    </>
    );
}