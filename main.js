import data from './data.js';

function dateConverter(date) {
  return date.split('-').join('.');
}

console.log(dateConverter('2020-11-26'));

function search(searchRequest) {
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].country === searchRequest ||
      data[i].city === searchRequest ||
      data[i].hotel === searchRequest
    ) {
      console.log(data[i]);
    }
  }
}

search('Germany')