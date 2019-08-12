//  Andrew Sokolowski      romance-test.js     07/25/2019

//  NOTE: since the bonus involves HTML, "test function:" merely indicates
//  that the function is used to interact with the HTML file being used
//  to write the program. Depending on how I implement the actual HTML file
//  to be submitted, I may keep them with minor edits

//  NOTE: obviously, after removing test functions, references to the text
//  functions must be removed from the primary functions that call them

const WORDS_PER_LINE = 10;
let wordPairs;

//  test function:
function readCorpus(event) {
  let input = event.target;
  let reader = new FileReader();

  wordPairs = {};
  reader.onload = function() {
    let corpus = reader.result;

    showText(corpus);
    wordPairs = generateWordPairs(corpus);
  };
	
  reader.readAsText(input.files[0]);
}

//  test function:
function showText(corpus) {
  let field = document.getElementById('plain-text');

  field.innerHTML = corpus;
}

function parseText(plainText) {
  let parsed = [];
  let len = plainText.length;
  let word = '';

  plainText = plainText.toLowerCase();
  for (let letter of plainText) {
    if (!(letter >= 'a' && letter <= 'z')) {
      if (letter === ' ' || letter === '\n') {
        parsed.push(word);
	word = '';
      }
    } else {
      word += letter;
    }
  }

  parsed.push(word);
  while (parsed.includes('')) {
    parsed.splice(parsed.indexOf(''), 1);
  }

  showParsed(parsed);
  return parsed;
}

//  test function:
function showParsed(parsedText) {
  let field = document.getElementById('parsed-text');
  let len = parsedText.length;
  let output = '';

  for (let i = 0; i < len; i++) {
    output += parsedText[i] + ', ';
    if (!((i + 1) % WORDS_PER_LINE)) {
      output += '<br/>';
    }
  }

  field.innerHTML = output;
}

function generateWordPairs(plainText) {
  let parsedText = parseText(plainText);
  let len = parsedText.length;
  let last = len - 1;

  for (let i = 0; i < len; i++) {
    if (i < last) {
      if (typeof wordPairs[parsedText[i]] === 'undefined' &&
          i < last) {
        wordPairs[parsedText[i]] = [parsedText[i + 1]];
      } else {
        wordPairs[parsedText[i]].push(parsedText[i + 1]);
      }
    }
  }

  showWordPairs();
}

function showWordPairs() {
  let field = document.getElementById('word-pairs');
  let output = '';

  for (let element in wordPairs) {
    output += element + ' => ' + wordPairs[element] + '<br/>';
  }

  field.innerHTML = output;
}
