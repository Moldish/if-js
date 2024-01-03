import { getHotels } from './available-hotels';

function getUrl() {
  const searchInput = document.getElementById('city-search');
  const searchQuery = searchInput.value.toLowerCase();
  //
  const adultsCount = document.getElementById('adult-count').innerHTML;
  const roomsCount = document.getElementById('rooms-count').innerHTML;
  const childrenCount = document.querySelectorAll('.child-select');
  const age = [];

  childrenCount.forEach((child) => {
    age.push(child.value);
  });
  //
  const baseUrl = 'https://if-student-api.onrender.com/api/';
  const hotelSearchUrl = new URL('hotels', baseUrl);
  //
  const params = {
    search: searchQuery,
    adults: adultsCount,
    rooms: roomsCount,
    children: age,
  };

  const searchParams = new URLSearchParams(params);

  hotelSearchUrl.search = searchParams.toString();

  return hotelSearchUrl;
}

const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => getHotels(getUrl()));
