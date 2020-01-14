'use strict';


const searchURL = 'https://api.openbrewerydb.org/breweries';





function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

$('#results').removeClass('hidden');

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h5>${responseJson[i].name}</h5>
     <p>Address: ${responseJson[i].street} </br> </br> ${responseJson[i].city}, ${responseJson[i].state} ${responseJson[i].postal_code} </p> 
      <a href='${responseJson[i].website_url}'>${responseJson[i].website_url}</a>
      </li>`)
  };
  if (responseJson == 0) {
    $('#results-list').text(`No Results, Please Try Again.`);
  }

};

function getBeer(query) {
  const params = {
    by_state: query,


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

    getBeer(searchTerm);
  });
}

$(watchForm);