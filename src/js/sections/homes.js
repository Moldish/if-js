import Swiper from 'swiper';
import { Navigation, FreeMode } from 'swiper/modules';
import data from './hotel-data';

const windowInnerWidth = document.documentElement.clientWidth;

function swiper() {
  if (windowInnerWidth < 468) {
    // eslint-disable-next-line no-unused-vars
    const swiperMob = new Swiper('.mySwiper', {
      modules: [FreeMode],
      slidesPerView: 2,
      spaceBetween: 16,
      freeMode: true,
    });
  } else {
    // eslint-disable-next-line no-unused-vars
    const swiperDesktop = new Swiper('.mySwiper', {
      modules: [Navigation],
      slidesPerView: 4,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

swiper();

const swiperContent = document.getElementById('js-swiper');

data.forEach((item) => {
  const fig = document.createElement('figure');
  if (windowInnerWidth < 468) {
    fig.classList.add('homes__col-mob');
  }
  fig.classList.add('swiper-slide', 'homes__swiper', 'homes__col', 'homes__col__photo');
  const pic = document.createElement('img');
  pic.src = item.imageUrl;
  if (windowInnerWidth < 468) {
    pic.classList.add('homes__col__photo');
  } else { pic.classList.add('homes__col__photo-png'); }
  fig.appendChild(pic);
  //
  const hotelName = document.createElement('figcaption');
  hotelName.textContent = item.name;
  fig.appendChild(hotelName);
  //
  const hotelPlace = document.createElement('figcaption');
  hotelPlace.textContent = `${item.city}, ${item.country}`;
  hotelPlace.classList.add('homes__caption');
  fig.appendChild(hotelPlace);
  //
  swiperContent.appendChild(fig);
});
