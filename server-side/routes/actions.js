const router = require('express').Router()
const Query = require('../db')
const jwt = require('jsonwebtoken')
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { verifyAdmin, verifyUser } = require('../verify')


// REGISTER
router.post('/register', async (req, res) => {
    const { fname, lname, username, password } = req.body
    if (fname && lname && username && password) {
        try {
            let q = `SELECT * FROM users WHERE username=?`
            let answer = await Query(q, [username])
            if (answer.length === 0) {
                const salt = genSaltSync(10)
                const hash = hashSync(password, salt)
                let q = `INSERT INTO users(fname,lname,username,password)
                VALUES(?, ?,?,?)`
                await Query(q, [fname, lname, username, hash])
                res.status(201).json({ error: false, msg: "Username added successfully, please wait few second to log in" })
            } else {
                res.status(400).json({ error: true, msg: "Username already taken" })
            }
        } catch (error) {
            res.status(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "Missing some info" })
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    // data exist
    if (username && password) {
        // user exist
        try {
            let q = `SELECT * FROM users WHERE username=?`
            let answer = await Query(q, [username])
            if (answer.length === 0) {
                res.status(401).json({ error: true, msg: "user not found" })
            } else {
                if (compareSync(password, answer[0].password)) {
                    let access_token = jwt.sign({ id: answer[0].user_id, fname: answer[0].fname, role: answer[0].admin }, "Sg007", {
                        expiresIn: "60m"
                    })
                        res.status(200).json({ error: false, msg: "User Login successfully",access_token })
                } else {
                    res.status(401).json({ error: true, msg: "Wrong password, Try again" })
                }
            }
        } catch (error) {
            res.status(401)
        }
    } else {
        res.status(400).json({ error: true, msg: "Missing some info" })
    }
})


router.get('/',verifyAdmin ,async (req,res) =>{
    try {
        let q = `SELECT * FROM users`
        let users = await Query(q)
        res.json(users)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.get('/islogged',verifyUser,  (req,res)=>{
    res.json(req.user)
})



module.exports = router