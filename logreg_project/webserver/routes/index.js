const helpers = require('../helpers')
const express = require('express')
const router = express.Router()

const MODEL_API_URL = 'http://' + process.env.MODEL_API_IP
console.log('API:', MODEL_API_URL)

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function fetchFeatures (url, delay, tries) {
  function onError (err) {
    const triesLeft = tries - 1
    if (!triesLeft) {
      console.log('Error:', err)
    }
    return sleep(delay).then(() => fetchFeatures(url, delay, triesLeft))
  }
  return fetch(url)
    .then(data => { return data.json() })
    .then(output => { features = output })
    .catch(onError)
}

const URL_FEATURES = MODEL_API_URL + '/features'
let features = null
const tries = 5

fetchFeatures(URL_FEATURES, 1000, tries)

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Breast Cancer Wisconsin (Diagnostic) Data Set',
    features
  })
})

router.post('/predict', (req, res, next) => {
  const URL_PREDICT = MODEL_API_URL + '/predict'

  const values = req.body
  const modelInput = {}
  for (let i = 0; i < values.length; i++) {
    modelInput[features[i].toLowerCase().replaceAll(' ', '_')] = values[i]
  };

  helpers.getPrediction(URL_PREDICT, modelInput).then(prediction => {
    res.send(prediction)
  })

  // helpers.saveToDb(modelInput);
})

module.exports = router
