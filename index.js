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
const svc1 = "http://localhost:3200/";
const LIST = 'getList';
const WRITE = 'writeRecord';
const READ = 'getRecord';
const EDIT = 'editRecord';
const DELETE = 'deleteRecord';

const show = (req) => {
	req.method === 'GET' ? console.log( req.method ) : console.log(req.body);
};

const packPayload = (body) => {
	const payload = {
		method: 'POST', 
		headers: {
			'Content-Type' : 'application/json',
			'Accept' : 'application/json'
		},
		body: JSON.stringify(body)	
	};
	return payload;
};

const dispatch = (url,res, body) => {
	fetch(url, packPayload(body))
	.then(res => res.json())
	.then((data) => {
		//console.log('MAIN RETURN ', data);
		res.json({ display: data});
	})
	.catch(e => {
		console.log(res);
	});
};

router.route('/')
.get((req, res, next) => {
	dispatch(svc1 + LIST, res, { request: 'main'});
})
.post((req, res, next) => {
	dispatch(svc1 + WRITE, res, req.body);
});

router.route('/getRecord')
.post((req, res, next) => {
	dispatch(svc1 + READ, res, req.body);
});

router.route('/editRecord')
.post((req, res, next) => {
	dispatch(svc1 + EDIT, res, req.body);
});

router.route('/deleteRecord')
.post((req, res, next) => {
	dispatch(svc1 + DELETE, res, req.body);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3100, () => {
	console.log('Running');
});