//  Andrew Sokolowski      romance-page.js    07/30/2019

//  HTML-specific code for romance.html -- main functions are located in
//  romance.js

const MSG1 = 'Please select a text file to be read!';
const MSG2 = 'Please select desired number of lines!';
const MSG3 = 'For best results make sure stanza length is less than number ' +
	     'of lines';
const MSG4 = 'Unexpected error. Click "Generate Poem!" button again';

function loadCorpus(event) {
  let input = event.target;
  let reader = new FileReader();

  reader.onload = function() {
    corpus = reader.result;
    document.getElementById('output-area1').innerHTML = '';
  }

  reader.readAsText(input.files[0]);
}

function isNum(arg) {
  for (let character of arg) {
    if (character < '0' || character > '9') {
      return false;
    }
  }

  return true;
}

function setNumLines() {
  let numLines = document.getElementById('lines-select').value;

  if (isNum(numLines)) {
    numberOfLines = Number(numLines);
  } else {
    numberOfLines = undefined;
  }

  document.getElementById('output-area2').innerHTML = '';
}

function setWordsPerLine() {
  let wordLines = document.getElementById('per-line-select').value;

  if (isNum(wordLines)) {
    wordsPerLine = Number(wordLines);
  } else {
    wordsPerLine = undefined;
  }
}

function setStanzaLength() {
  let stanzaLength = document.getElementById('stanza-select').value;

  if (isNum(stanzaLength)) {
    stanzaBreakEvery = stanzaLength;
  } else {
    stanzaBreakEvery = undefined;
  }
 
  document.getElementById('output-area3').innerHTML = '';
}

function submitAction() {
  let flag = true;

  if (typeof corpus === 'undefined') {
    flag = false;
    document.getElementById('output-area1').innerHTML = MSG1;
  }

  if (typeof numberOfLines === 'undefined') {
    flag = false;
    document.getElementById('output-area2').innerHTML = MSG2;
  }

  if (typeof stanzaBreakEvery === 'string') {
    if (stanzaBreakEvery >= numberOfLines) {
      document.getElementById('output-area3').innerHTML = MSG3;
    }
  }

  if (flag) {
    generatePoem(corpus, numberOfLines, wordsPerLine, stanzaBreakEvery);
  }
}

function showPoem(poem) {
  document.getElementById('output-area1').innerHTML = poem;
}

function showErrorMessage() {
  document.getElementById('output-area1').innerHTML = MSG3;
}
