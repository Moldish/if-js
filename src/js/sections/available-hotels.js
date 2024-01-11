const searchInput = document.getElementById('city-search');
const searchButton = document.getElementById('search-btn');
const hotelsContainer = document.getElementById('available-hotels');
const availableSection = document.querySelector('.available-hotels');
const showMoreBtn = document.getElementById('showMoreBtn');

function getHotels() {
    resetAvailable ()
    const searchQuery = searchInput.value.toLowerCase()
    const url = 'https://if-student-api.onrender.com/api/hotels';
    const searchUrl = `${url}?search=${searchQuery}`;

    fetch(searchUrl)
    .then(response => {
        if (response.ok) {
           return response.json()
        }
        else {return new Error('Error')}
    })
    .then(data => {
        data.forEach((item) => renderAvailable(item))
        showMore ()
    })
    .catch(error => console.error('Error:', error))
}

function renderAvailable(hotel) {

    availableSection.style.display = 'flex';

    const hotelFig = document.createElement('figure')
    hotelFig.classList.add('available-hotel-figure')

    const hotelPic = document.createElement('img')
    hotelPic.src = hotel.imageUrl
    hotelPic.classList.add('available-hotel-pic')

    const hotelName = document.createElement('figcaption')
    hotelName.innerHTML = hotel.name
    hotelName.classList.add('available-hotel-name')

    const hotelCity = hotel.city

    const hotelCountry = hotel.country

    const hotelLocation = document.createElement('figcaption')
    hotelLocation.innerHTML = `${hotelCity}, ${hotelCountry}`
    hotelLocation.classList.add('available-hotel-location')


    hotelFig.appendChild(hotelPic)
    hotelFig.appendChild(hotelName)
    hotelName.appendChild(hotelLocation)

    hotelsContainer.appendChild(hotelFig)
}

function resetAvailable () {
    availableSection.style.display = 'block'
    showMoreBtn.style.display = "none";
    availableSection.scrollIntoView({
        behavior: 'smooth'
    });

    while (hotelsContainer.firstChild) {
        hotelsContainer.removeChild(hotelsContainer.firstChild)
    }
}

function showMore () {
    if (hotelsContainer.children.length > 5) {
        showMoreBtn.style.display = "block";
    }

    for (let i = 5; i < hotelsContainer.children.length; i++) {
        hotelsContainer.children[i].style.display = 'none'}

    showMoreBtn.addEventListener("click", function() {
        for (let i = 5; i < hotelsContainer.children.length; i++) {
            hotelsContainer.children[i].style.display = "flex";
        }
        showMoreBtn.style.display = "none";
    })
}

searchButton.addEventListener('click', getHotels)

