//  Andrew Sokolowski      romance.js     07/25/2019

//  NOTE: helper functions to interact with the page romance.html are
//  located in the file romance-page.js

let wordPairs;
let poem;
let numberOfLines;
let corpus;
let stanzaBreakEvery;
let wordsPerLine;

function parseText(plainText) {
  let parsed = [];
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

  return parsed;
}

function generateWordPairs(plainText) {
  let parsedText = parseText(plainText);
  let len = parsedText.length;
  let last = len - 1;

  for (let i = 0; i < len; i++) {
    if (i < last) {
      if (typeof wordPairs[parsedText[i]] === 'undefined') {
        wordPairs[parsedText[i]] = [parsedText[i + 1]];
      } else {
        wordPairs[parsedText[i]].push(parsedText[i + 1]);
      }
    }
  }

  return wordPairs;
}

function writeLine(markovChain, numWords) {
  let keyList = Object.keys(markovChain);
  let nextKey = getRandomKey(keyList);
  let iterate = numWords - 1;
  let line = '';
  
  if (nextKey === null) {
    return null;
  }

  for (let i = 0; i < iterate; i++) {
    line += nextKey + ' ';
    nextKey = getRandomKey(markovChain[nextKey]);
    if (nextKey === null) {
      return null;
    }
  }
  line += nextKey;

  return line;
}

function getRandomKey(list) {
  if (typeof list === 'undefined') {
    return null;
  }

  return list[Math.floor(Math.random() * list.length)];
}

function getRandom3To12() {
  return Math.floor(Math.random() * 10) + 3;
}

function generatePoem(corpus, numberOfLines, wordsPerLine, stanzaBreakEvery) {
  let lengthFlag = true;
  let stanzaFlag = true;
  let showFlag = true;

  poem = '';
  wordPairs = {};
  wordPairs = generateWordPairs(corpus);
  if (typeof wordsPerLine === 'undefined') {
    lengthFlag = false;
  }

  if (typeof stanzaBreakEvery === 'undefined') {
    stanzaFlag = false;
  }

  for (let i = 0; i < numberOfLines; i++) {
    let line;

    if (!lengthFlag) {
      wordsPerLine = getRandom3To12();
    }

    line = writeLine(wordPairs, wordsPerLine) + '<br />';
  
    // this if/else block is supposed to print an error message (instead of
    // the poem) if writeLine(...) returns a null, but it seems to always
    // pass whether line === null or not (sometimes poems will have a line or
    // two that just say "null"
    if (line !== null) {
      poem += line;
    } else {
      showFlag = false;
      showErrorMessage();
      break;
    }

    if (stanzaFlag) {
      if (!((i + 1) % stanzaBreakEvery)) {
        poem += '<br />';
      }
    }
  }

  if (showFlag) {
    showPoem(poem);
  }
}
