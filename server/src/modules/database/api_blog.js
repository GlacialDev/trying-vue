import db from "./db"

export default function api_blog(app) {

    app.get('/blogposts', (req, res) => {
        db.get().collection('blogposts').find({}).toArray((err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.send(result)
        })
    })


    app.post('/blogposts', (req, res) => {
        let postContent = {
            id: req.body.id,
            date: req.body.date,
            title: req.body.title,
            text: req.body.text
        };
        db.get().collection('blogposts').insertOne(postContent, (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            console.log(result)
            console.log("added")
            res.sendStatus(200)
        })
    })

}