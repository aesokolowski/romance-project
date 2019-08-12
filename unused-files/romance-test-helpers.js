//  Andrew Sokolowski      romance-test-helpers.js     07/25/2019

//  NOTE: helper functions that handle HTML-related functions specific to
//  romance-test.html (as opposed to the more independent functions in
//  romance.js

//  NOTE: romance.js DOES include references to functions in this file
//  that are not necessary for the basic operations of the program and
//  can be easily removed

const WORDS_PER_LINE = 10;
const WRITE_PER_LINE = 10;
const NUMBER_OF_LINES = 10;

numberOfLines = NUMBER_OF_LINES;

function readCorpus(event) {
  let input = event.target;
  let reader = new FileReader();

  reader.onload = function() {
    let corpus = reader.result;
    let sampleLine;


    showText(corpus);
    generatePoem(corpus, numberOfLines);
/*
    wordPairs = generateWordPairs(corpus);
    sampleLine = writeLine(wordPairs, WRITE_PER_LINE);
    showLineSample(sampleLine);
*/
  };
	
  reader.readAsText(input.files[0]);
}

function showText(corpus) {
  let field = document.getElementById('plain-text');

  field.innerHTML = corpus;
}

function showParsed(parsedText) {
  let field = document.getElementById('parsed-text');
  let lenMinus1 = parsedText.length - 1;
  let output = '';

  for (let i = 0; i < lenMinus1; i++) {
    output += parsedText[i] + ', ';
    if (!((i + 1) % WORDS_PER_LINE)) {
      output += '<br/>';
    }
  }

  output += parsedText[lenMinus1];
  field.innerHTML = output;
}

function showWordPairs() {
  let field = document.getElementById('word-pairs');
  let output = '';

  for (let element in wordPairs) {
    output += element + ' => ' + wordPairs[element] + '<br/>';
  }

  field.innerHTML = output;
}

function showLineSample(line) {
  let field = document.getElementById('sample-line');

  field.innerHTML = line;
}

function showPoem(poem) {
  let field = document.getElementById('poem-field');

  field.innerHTML = poem;
}

function testSelect() {
  let numLines = Number(document.getElementById('lines-select').value);

  if (numLines !== NaN) {
    numberOfLines = numLines;
  } else {
    numberOfLines = NUMBER_OF_LINES;
  }
}
