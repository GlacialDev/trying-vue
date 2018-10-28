const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const config = require('./config/config')

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`))