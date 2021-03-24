const router = require('express').Router()
const Query = require('../db')
const { verifyUser, verifyAdmin } = require('../verify')

  
// router.get('/vacations', (req, res) => {
//     let q = 'SELECT * FROM vacations'
//     let vacations = Query(q,(err,servers)=>{
//         res.json(vacations)
//     })
// })


// router.get('/', verifyUser, async (req, res) => {
// try {
//     let q1 = `SELECT * FROM vacations WHERE id IN (SELECT vacation_id FROM likes WHERE user_id=?) order by id;`
//         let LikesByUser = await Quary(q1,[req.user.id])
//         res.json(LikesByUser)
// } catch (error) {
//     res.sendStatus(500)
// }
// })



router.get('/',verifyUser, async (req, res) => {
        try {
            let q1 = `SELECT * FROM vacations WHERE id IN (SELECT vacation_id FROM likes WHERE user_id=?) order by id;`
            let userLikes = await Query(q1,[req.user.id])
            let q2 = `SELECT * FROM vacations WHERE id NOT IN (SELECT vacation_id FROM likes WHERE user_id=?) order by id;`
            let userUnlikes = await Query(q2,[req.user.id])

            res.json({likes: userLikes, unlikes: userUnlikes})
        } catch (error) {
            res.sendStatus(500)
        }

})

router.post('/vacation_search', verifyUser, async (req,res) => {
    const { departureSearch, descriptionSearch,arrivalSearch } = req.body
    if( departureSearch || descriptionSearch || arrivalSearch){
    try {
        let q = `SELECT * FROM vacations WHERE departure LIKE ? AND description LIKE ? AND arrival LIKE ?`
        let searchResult = await Query(q,[`%${departureSearch}%`, `%${descriptionSearch}%`,`%${arrivalSearch}%`])
        res.json(searchResult)

    } catch (error) {
        res.sendStatus(500)
    }}else{
        res.status(400).json({ error: true, msg: "Missing info for search" })
    }



})



router.get('/vacations',verifyUser, async (req, res) => {
        try {
            let q = `SELECT * FROM vacations`
            let allvacations = await Query(q)
            res.json(allvacations)
        } catch (error) {
            res.sendStatus(500)
        }

})





router.post('/add_like/:id',verifyUser, async (req, res) => {
    const { vacation_id } = req.body
    const user = req.user
    if(user.id == req.params.id) {
        if ( req.params.id && vacation_id) {
            try {
                let q = `INSERT INTO likes(user_id,vacation_id)
            VALUES("?","?")`
                await Query(q, [+req.params.id, vacation_id])
                q = 'UPDATE vacations set likes = likes + 1 where id = ?'
                let vacations = await Query(q,[vacation_id])
                q = ' UPDATE vacations SET likes = (SELECT COUNT(*) FROM likes WHERE vacation_id = ?) where id =?;'
                vacations = await Query(q,[vacation_id,vacation_id])
                res.sendStatus(200)
            } catch (error) {
                res.sendStatus(500)
            }
        } else {
            res.status(400).json({ error: true, msg: "missing some info" })
        } 
    }else { res.json ({error : true , msg : "shlomy is secrued"})}
})

router.post('/dis_like/:id', async (req, res) => {
    const { vacation_id } = req.body
    if ( req.params.id && vacation_id) {
        try {
            let q = ` DELETE FROM likes WHERE user_id=? and vacation_id=?`
            await Query(q, [+req.params.id, vacation_id])
            q = ' UPDATE vacations SET likes = (SELECT COUNT(*) FROM likes WHERE vacation_id = ?) where id =?;'
            let vacations = await Query(q,[vacation_id,vacation_id])
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


//ADMIN

///DELETE VACATION
router.delete('/admin/:id',verifyAdmin, async (req, res) => {
    if (req.params.id) {
        try {
            let q1= "DELETE FROM vacations where id = ?;"
            await Query(q1, [req.params.id])
            let q2 = "DELETE FROM likes WHERE vacation_id = ?"
            await Query(q2,[req.params.id])
            let q3 = "SELECT * FROM vacations"
            let vacations = await Query(q2,[req.params.id])
            res.status(200).send({ error: false, msg: "the vacation number " +req.params.id + "is deleted from the system" })
        } catch (error) {
            res.status(500).send({ error: true, msg: "Error! the vacation number id" +req.params.id + "is not deleted!"  })

        }

    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

/// ADD VACATION

router.post('/admin/add', verifyAdmin, async (req, res) => {
    const { description, destination, image_src, departure, arrival, price } = req.body
    if ( description && destination && image_src && departure && arrival && price) {
        try {
                let q = `INSERT INTO vacations (description, destination, image_src, departure, arrival,price)
                VALUES(?,?,?,?,?,?)`
                await Query(q, [description, destination, image_src, departure, arrival, price])
                res.status(201).json({ error: false, msg: "Vacation added successfully" })
        } catch (error) {
            res.status(500)
        }
       
    } else {
        res.status(400).json({ error: true, msg: "Missing some info" })
    }
})


// Edit Vacation
router.put('/admin/edit/:id',verifyAdmin,async (req,res) => {
    const { description, destination, image_src, departure, arrival, price } = req.body
    if ( description && destination && image_src && departure && arrival && price){
        try {
            let q = `UPDATE vacations SET description=?,destination=?, image_src=?, departure=?, arrival=?, price=?
            WHERE id=?;`
            await Query(q, [description, destination, image_src, departure, arrival, price,req.params.id])
            res.status(201).json({ error: false, msg: "Vacation edited successfully" })

        } catch (error) {
            res.status(500)
        }
    } else {
    res.status(400).json({ error: true, msg: "Missing some info" })
}
})






module.exports = router