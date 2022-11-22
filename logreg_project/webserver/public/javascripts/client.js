const serverUrl = 'http://localhost:3000'

// eslint-disable-next-line no-unused-vars
function postFeatureValues () {
  const responseText = document.getElementById('model_response')
  responseText.innerHTML = 'Retrieving classification...'
  const inputs = document.getElementsByTagName('input')
  let values = []
  Array.from(inputs).forEach(function (element) {
    values.push(element.value)
  })
  values = values.map(Number)

  const predictPath = '/predict'
  fetch(serverUrl + predictPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((response) => response.json())
    .then((data) => {
      responseText.innerHTML = data.prediction_text
    })
    .catch((error) => {
      console.error('Error:', error)
      responseText.innerHTML = 'Failed to retrieve classification'
    })
}
