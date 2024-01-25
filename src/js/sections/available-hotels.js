const hotelsContainer = document.getElementById('available-hotels');
const availableSection = document.querySelector('.available-hotels');
const showMoreBtn = document.getElementById('showMoreBtn');

const savedHotels = JSON.parse(sessionStorage.getItem('hotels'));

function renderAvailable(hotel) {
  availableSection.style.display = 'flex';

  const hotelFig = document.createElement('figure');
  hotelFig.classList.add('available-hotel-figure');

  const hotelPic = document.createElement('img');
  hotelPic.src = hotel.imageUrl;
  hotelPic.classList.add('available-hotel-pic');

  const hotelName = document.createElement('figcaption');
  hotelName.innerHTML = hotel.name;
  hotelName.classList.add('available-hotel-name');

  const hotelCity = hotel.city;

  const hotelCountry = hotel.country;

  const hotelLocation = document.createElement('figcaption');
  hotelLocation.innerHTML = `${hotelCity}, ${hotelCountry}`;
  hotelLocation.classList.add('available-hotel-location');

  hotelFig.appendChild(hotelPic);
  hotelFig.appendChild(hotelName);
  hotelName.appendChild(hotelLocation);

  hotelsContainer.appendChild(hotelFig);
}

function resetAvailable() {
  availableSection.style.display = 'block';
  showMoreBtn.style.display = 'none';
  availableSection.scrollIntoView({
    behavior: 'smooth',
  });

  while (hotelsContainer.firstChild) {
    hotelsContainer.removeChild(hotelsContainer.firstChild);
  }
}

function showMore() {
  if (hotelsContainer.children.length > 5) {
    showMoreBtn.style.display = 'block';
  }

  for (let i = 5; i < hotelsContainer.children.length; i += 1) {
    hotelsContainer.children[i].style.display = 'none';
  }

  showMoreBtn.addEventListener('click', () => {
    for (let i = 5; i < hotelsContainer.children.length; i += 1) {
      hotelsContainer.children[i].style.display = 'flex';
    }
    showMoreBtn.style.display = 'none';
  });
}
function bubbleSort(arr, param) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - 1; j += 1) {
      if (arr[j][param] > arr[j + 1][param]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

export default function getHotels(searchUrl) {
  resetAvailable();
  if (savedHotels !== null) {
    savedHotels.forEach((item) => renderAvailable(item));
    showMore();
  } else {
    fetch(searchUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return new Error('Error');
      })
      .then((data) => {
        sessionStorage.setItem('hotels', JSON.stringify(data));
        bubbleSort(data, 'name');
        data.forEach((item) => renderAvailable(item));
        showMore();
      })
      .catch((error) => console.error('Error:', error));
  }
}
