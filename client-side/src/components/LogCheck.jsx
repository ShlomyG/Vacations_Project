import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


export const LogCheck = () => {
const history = useHistory()
const dispatch = useDispatch()

useEffect(()=>{
    (async ()=>{
        let res =  await fetch("http://localhost:1000/actions/islogged", {
            method: "GET",
            headers: { "Authorization": localStorage.token }
        }
        )
        let data = await res.json()
        if(data.error){
            dispatch({type:'LOGOUT'})
            history.push('/login')
        }else{
            dispatch({
                type:'LOGIN',
                payload : {
                    id:data.id,
                    role:data.role,
                    fname:data.fname
                }
            })
            history.push('/vacations')
        }
    })()
},[])

        return (null)

}

