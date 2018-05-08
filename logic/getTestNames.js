
// getTestNames : sources -> test names found in sources
//
// sources: Map <string, string>
// where key = file name and value = file content
//
// return : array of string
function getTestNames (sources) {

	let testNames = [];

	for(let [fileName, fileContent] of sources){
		testNames = testNames.concat(extractNames(fileContent));
	}
	
	return testNames;
}


// extractNames : fileContent -> test names found in file
// fileContent: string
// return : array of string
function extractNames(fileContent) {
	
	const regexpForTestNames = /def (\w+)/g;
	
	let testNames = [];
	let match;
	
	do {
		
		match = regexpForTestNames.exec(fileContent);
		
		if(match != null) testNames.push(match[1]); // adding the captured part
		
	} while(match != null);
	
	return testNames;
}

module.exports = getTestNames;