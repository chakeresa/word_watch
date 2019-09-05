import $ from 'jquery';
let domain = 'http://localhost:3000';

const getTopWord = () => {
  fetch(`${domain}/api/v1/top_word`)
    .then(response => response.json())
    .then(topWordApiResult => displayTopWordResult(topWordApiResult))
    .catch(error => console.error({ error }));
};

const displayTopWordResult = (topWordApiResult) => {
  console.log("Object.keys(topWordApiResult.word) = " + Object.keys(topWordApiResult.word));
  $('#top-word').append(`
  <h5 id="top-word-result">
    ${Object.keys(topWordApiResult.word)}
  </h5>
`);
};

$(document).ready(() => {
  getTopWord();
})
