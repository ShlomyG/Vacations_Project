const express = require('express')
const cors = require('cors')
const db=require('./db')
const Query = require('./db')
const app = express()
const { verifyAdmin } = require('./verify')


app.use(express.json())
app.use(cors())

app.use('/actions', require('./routes/actions'))
app.use('/user', require('./routes/user'))




app.get('/', (req, res) => {
    res.send('Welcom to my vacations Project api')
})


app.get('/vacations' , verifyAdmin, async (req,res) =>{
    try {
        let q = `SELECT * FROM vacations`
        let vacations = await Query(q)
        res.json(vacations)
    } catch (error) {
        res.sendStatus(500)
    }
})


app.listen(1000, () => console.log("runing on port 1000"))