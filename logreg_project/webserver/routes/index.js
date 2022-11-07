var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Skin Cancer Predictor',
  });
});

router.get('/features', (req, res, next) => {
  const model_api_url = 'http://localhost:8080'
  const path = '/features'
  const url = model_api_url + path

  fetch(url)
    .then(data => {return data.json()})
    .then(features => {res.send(features)});
});

module.exports = router;
