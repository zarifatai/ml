const helpers = require('../helpers')
const express = require('express')
const router = express.Router()

const MODEL_API_URL = 'http://localhost:8080'

const URL_FEATURES = MODEL_API_URL + '/features'
let features = null
fetch(URL_FEATURES)
  .then(data => { return data.json() })
  .then(output => { features = output })

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Skin Cancer Predictor',
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
