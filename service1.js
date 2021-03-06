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

mongoose.Promise = global.Promise;
const mongooseConnect = Rx.Observable  
		.fromPromise(mongoose.connect('mongodb://localhost/api', {
			useMongoClient: true
		}));
mongooseConnect
.subscribe( x => console.log('SVC 1 CONNECTED'), e => console.error(e));

router.route('/getList')
.post((req, res, next) => {
	Person.find()
	.exec((err, people) => {
		if(err)
			res.send(err);
		res.json(people);
	});
});
router.route('/writeRecord')
.post((req, res, next) => {
	console.log('SVC 1 WRITE RECORD' + req.body);
	const person = new Person();
	person.firstName = req.body.firstName;
	person.lastName = req.body.lastName;
	person.email = req.body.email;
	person.save((err) => {
		if(err) res.send(err);
		res.json({ display: 'SAVED'});
	});
});
router.route('/getRecord')
.post((req, res, next) => {
	console.log('SVC1 GET RECORD ' + req.body.id);
	Person.findById(req.body.id, (err, person) => {
		if(err) res.send(err);
		res.json(person);
	});
});
router.route('/editRecord')
.post((req, res, next) => {
	console.log('SVC1 EDIT RECORD ' + req.body.id);
	Person.findById(req.body.id, (err, person) => {
		if(err) res.send(err);
		person.firstName = 'EDITED';
		person.lastName = person.lastName;
		person.email = person.email;
		person.save((err) => {
			if(err) res.send(err);
			res.json({ display: 'EDITED'});
		});
	});
});
router.route('/deleteRecord')
.post((req, res, next) => {
	console.log('SVC1 DELETE RECORD ' + req.body.id);
	Person.remove({_id: req.body.id}, (err, person) => {
		if(err) res.send(err);
		res.json({ display: 'DELETED'});
	});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3200, () => {
	console.log('Running');
});