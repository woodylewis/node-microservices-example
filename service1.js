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
const main = "http://localhost:3100";

mongoose.Promise = global.Promise;
const mongooseConnect = Rx.Observable  
						.fromPromise(mongoose.connect('mongodb://localhost/api', {
							useMongoClient: true
						}));
mongooseConnect
.subscribe( x => console.log('CONNECTED'), e => console.error(e));

const show = (req) => {
	req.method === 'GET' ? console.log( req.method ) : console.log(req.body);
};

router.route('/')
.post((req, res, next) => {
	//console.log('INCOMING POST ' + req.body.key);
	Person.find()
	.exec((err, people) => {
		if(err)
			res.send(err);
		res.json(people);
	});
	/*
	.get((req, res, next) => {
	console.log('INCOMING ' + req.body);
	Person.find()
	.exec((err, people) => {
		if(err)
			res.send(err);
		res.json(people);
	});
	})
	show(req);
	const person = new Person();
	person.firstName = req.body.firstName;
	person.lastName = req.body.lastName;
	person.email = req.body.email;

	person.save((err) => {
		if(err) res.send(err);
		res.json({ display: 'SAVED'});
	});
	*/
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3200, () => {
	console.log('Running');
});