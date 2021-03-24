
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

export default function Chart() {
    const [chartVacations, setChartVacations] = useState([])
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        fetchData()
   
    }, [])

    const fetchData = async () => {
        let res = await fetch('http://localhost:1000/vacations/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }
        })
        let data = await res.json()
        if (res.status === 200) {
            setChartVacations(data.filter(vacation => vacation.likes > 0))
            // setChartVacations(data)
        } else if (data.error && data.errorType === "Token") {
            dispatch({ type: 'LOGOUT' })
        }
    }
    const data = {
        labels: chartVacations.map(v => v.description),
        datasets: [
            {
                label: 'Likes Vacation',
                backgroundColor: 'rgba(0,0,132,0.6)',
                borderColor: 'rgba(0,0,0,0.8)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,255,0,0.8)',
                hoverBorderColor: 'rgba(0,0,132,1)',
                data: chartVacations.map(v => v.likes)
            },

        ],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }],

            },
            maintainAspectRatio: false
        }
    }

    return (

        <div className="chart_container" >
            {user && user.role === 1 &&
                <>
                    <h2>Followers Vacations Chart </h2>
                    {chartVacations && chartVacations.length > 0 ?
                        <div className="chart" >
                            <Bar data={data}
                                options={data.options}
                            />
                            </div> : <h1>There is no followers yet check later for updates..</h1>}</>}
        </div>
    )
}
