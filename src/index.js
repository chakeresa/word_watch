import $ from 'jquery';
// let domain = 'http://localhost:3000';
let domain = 'https://wordwatch-api.herokuapp.com';

const getTopWord = () => {
  console.log('fetching latest top word')
  fetch(`${domain}/api/v1/top_word`)
    .then(response => response.json())
    .then(topWordApiResult => displayTopWordResult(topWordApiResult))
    .catch(error => console.error({ error }));
};

const displayTopWordResult = (topWordApiResult) => {
  $('#top-word').html('Top word from Word Watch API:');
  
  $('#top-word').append(`
    "${Object.keys(topWordApiResult.word)}"
  `);
  
  $('#word-count').html('');

  $('#word-count').append(`
    <p>Frequency = ${Object.values(topWordApiResult.word)}</p>
  `);
};

const addNewText = (textInput) => {
  console.log("textInput = " + textInput);
  let wordsAry = textInput.replace(/[^0-9a-z ]/gi, '').split(" ")
  console.log("wordsAry = " + wordsAry)

  var postAllWords = new Promise((resolve, reject) => {
    for (const word of wordsAry) {
      fetch(`${domain}/api/v1/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: { value: word } })
      }).then(() => resolve())
    }
  });

  postAllWords.then(() => {
    console.log(`all post requests for ${textInput} made`);
    getTopWord();
  });

  // fetch(`${domain}/api/v1/words`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ word: { value: textInput } })
  // })
  //   .then(done => {
  //     console.log(`post request for ${textInput} made`);
  //     getTopWord();
  //   })
  //   .catch(error => console.log(error));
};

$(document).ready(() => {
  getTopWord();

  $('#break-down-button').on('click', () => {
    event.preventDefault(); //don't do a post request automatically
    let textInput = $("textarea#text-input").val()
    addNewText(textInput);
  });
})
