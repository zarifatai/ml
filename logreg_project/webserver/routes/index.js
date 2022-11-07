var express = require('express');
var router = express.Router();

const model_api_url = 'http://localhost:8080'

const url_features = model_api_url + '/features'
features = null
fetch(url_features)
  .then(data => {return data.json()})
  .then(output => {features = output});

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(features)
  res.render('index', {
    title: 'Skin Cancer Predictor',
    features: features,
  });
});

// TODO:
// - send dictionary to model api rather than array of floats
// - api call should be directly from client to model api rather than through nodejs server
router.post('/predict', (req, res, next) => {
  values = req.body
  url_predict = model_api_url + '/predict'
  prediction = null
  fetch(url_predict)
    .then(data => {return data.json()})
    .then(output => {prediction = output})
  res.send({prediction: prediction})
});

module.exports = router;

