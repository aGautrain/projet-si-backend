const fs = require('fs');
const del = require('del');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'tests/'});

// our functions are stored in distinct files for cleaner code
const readTestDescriptions = require('./logic/getTestDescriptions');





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/uploadTests', upload.single('testfile'), function(req, res) {
	
	// 1 - upload
	req.file.location = (__dirname + '/' + req.file.destination + req.file.filename);
	console.log('[POST /uploadTests] received tests / ' + req.file.originalname + ' / ' + req.file.size + 'o / ' + req.file.location);
	
	// 2 - read	
	let sources = new Map();
	sources.set(req.file.originalname, fs.readFileSync(req.file.location, 'utf8'));

	// 3 - extract
	const testsFound = readTestDescriptions(sources);
	
	// 4 - return
	res.json(testsFound);
});

app.get('/', function(req, res) {
	res.send('Server working fine');
});

let runningInstance = app.listen(3000, function() {
	console.log('listening on localhost:3000');
});

process.on('SIGINT', () => {
  console.log('closing connection');
  runningInstance.close();
  
  console.log('deleting uploaded files');
  del.sync(['tests/**', '!tests']);
  
  
});
