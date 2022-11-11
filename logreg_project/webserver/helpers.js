const getPrediction = async (urlPredict, modelInput) => {
  const res = await fetch(urlPredict, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modelInput)
  })

  if (res.status === 200) {
    const prediction = await res.json()
    return prediction
  } else { return { error: res.status } }
}

// const saveToDb = (modelInput) => {
//     // code
// }

exports.getPrediction = getPrediction
// exports.saveToDb = saveToDb
