const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./router/index.js')

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use((req, res, next) => {
	//设置请求头
	res.set({
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Max-Age': 1728000,
		'Access-Control-Allow-Origin': req.headers.origin || '*',
		'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
		'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
	})
	req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.use(express.static('public'))

router(app)

let server = app.listen(3000);
