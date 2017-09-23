const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');

const proc1 = (req, res, next) => {
	console.log('proc1 - req ', req.body);
	next();
};

const proc2 = (req, res, next) => {
	//res.json({ display: "TEST" });
	console.log('proc2 - req ', req.body);
	//next();
	res.send("TEST");
};
	
router
.route('/')
//.get([ proc1, proc2], (req, res, next) => {})
.get((req, res, next) => {
    //console.log('REQUEST ', req);
    //console.log('RESPONSE ', res);
	res.send("TEST");
})
.post([ proc1, proc2],(req, res, next) => {});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);
app.use('/', router);
app.listen(3200, () => {
	console.log('Running');
});