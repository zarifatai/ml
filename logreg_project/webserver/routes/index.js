var helpers = require('../helpers')
var express = require('express');
var router = express.Router();

const model_api_url = 'http://localhost:8080'

const url_features = model_api_url + '/features'
features = null
fetch(url_features)
  .then(data => {return data.json()})
  .then(output => {features = output});

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Skin Cancer Predictor',
    features: features,
  });
});

router.post('/predict', (req, res, next) => {
  url_predict = model_api_url + '/predict'

  values = req.body
  model_input = {};
  for (let i = 0; i < values.length; i++) {
    model_input[features[i].toLowerCase().replaceAll(' ', '_')] = values[i];
  };

  prediction = helpers.getPrediction(url_predict, model_input)
  console.log("test", prediction)
  // res.send(helpers.getPrediction(url_predict, model_input));
  // helpers.saveToDb(model_input);
});

module.exports = router;

