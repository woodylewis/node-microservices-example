const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Person = require('./models/app');

console.log('START');
const promise = mongoose.connect('mongodb://localhost/api', {
	useMongoClient: true,
});

router.route('/')
.get((req, res, next) => {
	console.log('req ', req.body);
	Person.find()
	.exec((err, people) => {
		if(err)
			res.send(err);
		res.json(people);
	});
	//console.log('req ', res.body);
})
.post((req, res, next) => {
	console.log('req ', req.body);
	const person = new Person();
	person.firstName = req.body.firstName;
	person.lastName = req.body.lastName;
	person.email = req.body.email;

	person.save((err) => {
		if(err) res.send(err);
		res.json({ display: 'SAVED'});
	});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3100, () => {
	console.log('Running');
});

/*
const proc1 = (req, res, next) => {
	console.log('proc1 - req ', req.body);
	next();
};

const proc2 = (req, res, next) => {
	res.send("TEST");
};

const url = "http://localhost:3200";

router
.route('/')
.get([ proc1, proc2], (req, res, next) => {})
.post([ proc1, proc2],(req, res, next) => {});
*/