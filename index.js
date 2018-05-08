const fs = require('fs');
const express = require('express');
const app = express();

// our functions are stored in distinct files for cleaner code
const readTestNames = require('./logic/getTestNames');


app.get('/uploadTests', function(req, res) {
	
	// 1 - upload
	
	// 2 - read	
	let sources = new Map();
	sources.set('testTypesAlg', fs.readFileSync(__dirname + '/tests/testTypesAlg.scala', 'utf8'));

	// 3 - extract
	const testsFound = readTestNames(sources);
	
	// 4 - return
	res.json(testsFound);
});

app.get('/', function(req, res) {
	res.send('Server working fine');
});

app.listen(3000, function() {
	console.log('listening on localhost:3000');
});
