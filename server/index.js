const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const config = require('./src/modules/config/config')
const secretConfig = require('./src/modules/config/secret/config')
const apiai = require('apiai')
let dialogflow = apiai(secretConfig.apiaiKey)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let port = process.env.PORT || config.port;
app.set('env', 'development');
app.set('port', port);

// app.listen(port, function () {
//     console.log('Express server listening to port ' + port);
// });

import db from "./src/modules/database/db"
db.connect('mongodb://localhost:27017', 'second', (err) => {
    if (err) {
        // isDatabaseOn = false
        console.log('Database is not available, reactions/polls disabled')
    }
    app.listen(port, () => {
        // isDatabaseOn = true
        console.log('Express server listening to port ' + port);
        console.log('Database is available')
    })
})

import chat_widget from "./src/modules/chat_widget";
chat_widget(app, dialogflow);
import api_blog from "./src/modules/database/api_blog"
api_blog(app)