// function does not work yet
const getPrediction = async (url_predict, model_input) => {
  let prediction = null
  fetch(url_predict, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model_input),
  })
		.then(res => {return res.json()})
		.then(output => {
			console.log(output)
			prediction = output
		})
  return prediction 
}

// const saveToDb = (model_input) => {
//     // code
// }

exports.getPrediction = getPrediction
// exports.saveToDb = saveToDb