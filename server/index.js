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

app.listen(port, function () {
    console.log('Express server listening to port ' + port);
});

import chat_widget from "./src/modules/chat_widget";
chat_widget(app, dialogflow);