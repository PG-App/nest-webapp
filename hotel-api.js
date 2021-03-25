const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://hotels4.p.rapidapi.com/locations/search',
  params: {query: 'new york', locale: 'en_US'},
  headers: {
    'x-rapidapi-key': '327a845cd1msh24c472eb2d4eaccp1cafacjsn48fb1d7fa305',
    'x-rapidapi-host': 'hotels4.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response);
}).catch(function (error) {
	console.error(error);
});