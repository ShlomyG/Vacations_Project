import React, { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Vacation from "./Vacation";
import SearchBar from "./SearchBar";
import { Typography } from "@material-ui/core";
  
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
  
      '& > *': {
        marginLeft: theme.spacing(7),
        marginTop: theme.spacing(5)
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
  

export default function Vacations({history}) {
    const classes = useStyles();
    const user = useSelector(state => state.user)
    const [likeVacations, setLikeVacations] = useState([])
    const [unLikeVacations, setUnLikeVacations] = useState([])
    const [serachedVacations, setSearchedVacations] = useState([]);
    const [likes, setLikes] = useState(true)

    useEffect(() => {
    (async () => {
        let res = await fetch('http://localhost:1000/user/',{
            method:"GET",
            headers:{"Authorization":localStorage.token}
        })
        let data = await res.json()
        setLikeVacations(data.likes)
        setUnLikeVacations(data.unlikes)
    
    })()
    }, [likes])
    
    return (
        <div >
            {user.login ? (
                <>
                          <Typography variant="h4" className="title">
                          hello {user.fname}
          </Typography>

                {/* <h1>hello {user.fname}</h1> */}
                <SearchBar
            setLikeVacations={setLikeVacations}
            setUnLikeVacations={setUnLikeVacations}
            setSearchedVacations={setSearchedVacations}
            LikeVacations={likeVacations}
            unLikeVacations={unLikeVacations}
          />

    <div className={classes.root}>
                
            

                 {/* {likeVacations.map(v => (<Vacation  key={v.id} vacation={v} trigger={likes} likes={true} setLikes={setLikes}/>))}
        

                 {unLikeVacations.map(v => (<Vacation   key={v.id} vacation={v} trigger={likes}  likes={false}  setLikes={setLikes}/>))} */}

                 {serachedVacations.length >0 ?
                  serachedVacations.map( v => (<Vacation   key={v.id} vacation={v} trigger={likes}  likes={likeVacations.filter(likedV=> likedV.id===v.id).length > 0 ? true : false}  setLikes={setLikes}/>))
                  :(<>{likeVacations.map(v => (<Vacation  key={v.id} vacation={v} trigger={likes} likes={true} setLikes={setLikes}/>))}
                  {unLikeVacations.map(v => (<Vacation   key={v.id} vacation={v} trigger={likes}  likes={false}  setLikes={setLikes}/>))}</>)}

                </div>
        </>

            ) : (
                    <>
                    {/* {history.push("/")} */}
                        <Link to="/login">login</Link>
                        {/* <Link to="/signup">signup</Link> */}
                    </>
                )}

        </div>
    )
}
