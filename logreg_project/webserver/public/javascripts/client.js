const server_url = 'http://localhost:3000'
const path = '/features'
const url = server_url + path

fetch(url)
	.then(data => {return data.json()})
	.then(res => {console.log(res)})