
// getTestNames : sources -> test names found in sources
//
// sources: Map <string, string>
// where key = file name and value = file content
//
// return : array of string
function getTestDescriptions (sources) {

	let testNames = [];

	for(let [fileName, fileContent] of sources){
		testNames.push({
			"source": fileName,
			"tests": extractNameAndCode(fileContent)
		});
	}
	
	return testNames;
}


// extractNameAndCode
// fileContent: string
// return : [ { testName, testCode } ]
function extractNameAndCode(fileContent) {
	
	const regexpForTestNames = /def (\w+)/g;
	
	let testDescriptions = [];
	let match;
	
	do {
		
		match = regexpForTestNames.exec(fileContent);
		
		if(match != null) {
			testDescriptions.push({
				"testName": match[1],
				"testCode": extractCode(match['input'], match['index'])
			});
		}
		
	} while(match != null);
	
	return testDescriptions;
}

// extractCode
// startIndex: number
// return : string
function extractCode(fileContent, startIndex) {

	let index = startIndex;
	let currentChar;
	let blockOpen = 0;
	let endOfTestReached = false;
	let testStarted = false;
	
	while(!endOfTestReached){
		
		currentChar = fileContent.charAt(index);
		
		if(currentChar === '{') {
			if(testStarted) {
				blockOpen++;
			} else {
				testStarted = true; // reached start of test definition
			}
		} else if (currentChar === '}') {
			blockOpen--;
		}
		
		if(testStarted && blockOpen < 0){
			endOfTestReached = true;
		}
		
		index++;
	}
	
	return fileContent.substring(startIndex, index);
}

module.exports = getTestDescriptions;