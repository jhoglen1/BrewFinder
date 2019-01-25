'use strict';


const searchURL = 'https://api.openbrewerydb.org/breweries';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
     <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};

  $('#results').removeClass('hidden');
};

function getParks(query, total=10) {
  const params = {

    q: query,
    total: total-1,

  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const total = $('#js-max-results').val();
    getParks(searchTerm, total);
  });
}

$(watchForm);
