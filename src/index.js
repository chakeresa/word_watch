import $ from 'jquery';
let domain = 'http://localhost:3000';

const getTopWord = () => {
  fetch(`${domain}/api/v1/top_word`)
    .then(response => response.json())
    .then(topWordApiResult => displayTopWordResult(topWordApiResult))
    .catch(error => console.error({ error }));
};

const displayTopWordResult = (topWordApiResult) => {
  $('#top-word').append(`
  <h5 id="top-word-result">
    ${Object.keys(topWordApiResult.word)} (${Object.values(topWordApiResult.word)} results)
  </h5>
`);
};

const addNewText = (textInput) => {
  console.log("textInput = " + textInput);
  fetch(`${domain}/api/v1/words`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: { value: textInput } })
  })
    .then(done => {
      console.log("post request made");
      getTopWord();
    })
    .catch(error => console.log(error));
};

$(document).ready(() => {
  getTopWord();

  $('#break-down-button').on('click', () => {
    event.preventDefault(); //don't do a post request automatically
    console.log("text input = " + $("textarea#text-input").value)
    // addNewText($("textarea#text-input").value);
  });
})
