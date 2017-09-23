const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Person = require('./models/app');
const Rx = require('rx');
const RxNode = require('rx-node');
const svc1 = "http://localhost:3200";

const show = (req) => {
	req.method === 'GET' ? console.log( req.method ) : console.log(req.body);
};

router.route('/')
.get((req, res, next) => {
	const payload = { key: 'all' };
	const options = {
		method: 'POST', 
		headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		},
		body: JSON.stringify(payload)	
	};
	fetch(svc1, options)
	.then(res => res.json())
	.then((data) => {
		res.json({ display: data});
	})
	.catch(e => {
		console.log(res);
	});
})
.post((req, res, next) => {
	show(req);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3100, () => {
	console.log('Running');
});