const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const config = require('./src/config/config')
const apiai = require('apiai')
let dialogflow = apiai(config.apiaiKey)


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`))

app.get('/chatbot', (req, res) => {
  let text = req.query.text
  talk(text).then((answer) => {
    res.send(
      {
        answer: answer
      }
    )
  })
})

function talk(text) {
  return new Promise((resolve, reject) => {
    let talkRequest = dialogflow.textRequest(text, {
      sessionId: 'Canadian_bot_talk_to_you'
    });
  
    talkRequest.on('response', function (response) {
      let answer = response.result.fulfillment.speech
      if(answer === '') answer = "Я не знаю, что тебе на это ответить."
      resolve(answer)
    });
  
    talkRequest.on('error', function (error) {
      reject(error)
    });
  
    talkRequest.end();
  })
}