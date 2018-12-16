import db from "./db"

export default function api_blog(app) {

    app.get('/blogposts_count', (req, res) => {
        db.get().collection('blogposts').count().then((result) => {
            res.send(""+result)
        })
    })

    app.get('/blogposts', (req, res) => {
        db.get().collection('blogposts').find({ id : { $gte : +req.query.firstPostIndex, $lte : +req.query.lastPostIndex } }).toArray((err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            console.log(req.query.firstPostIndex+' '+req.query.lastPostIndex)
            console.log(result)
            res.send(result)
        })
    })

    app.post('/blogposts', (req, res) => {
        let postContent = {
            id: +req.query.id,
            date: req.query.date,
            title: req.query.title,
            text: req.query.text
        };
        db.get().collection('blogposts').insertOne(postContent, (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })

}