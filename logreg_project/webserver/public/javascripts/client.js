const server_url = 'http://localhost:3000'
// const path = '/features'
// const url = server_url + path

// fetch(url)
// 	.then(data => {return data.json()})
// 	.then(res => {console.log(res)})

function postFeatureValues() {
	let inputs = document.getElementsByTagName('input');
	let values = [];
	Array.from(inputs).forEach(function (element) {
		values.push(element.value)
      });
	values = values.map(Number);

	const predict_path = '/predict';
	fetch(server_url + predict_path, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	  })
		.then((response) => response.json())
		.then((data) => {
		  console.log('Success:', data);
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
}