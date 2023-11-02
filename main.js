import hotels from './data.js';

const palindromeCheck = (x) =>
  console.log(x === x.split('').reverse('').join(''));

palindromeCheck('шалаш');

console.log('----------');
function search(searchRequest) {
  const searchResult = hotels.reduce((acc, item) => {
    if (
      item.country === searchRequest ||
      item.city === searchRequest ||
      item.name === searchRequest
    ) {
      acc += [`${item.country} ${item.city} ${item.name} `];
    }
    return acc;
  });
  console.log(searchResult);
}

search('USA');

console.log('----------');

const searchUnique = (hotels) =>
  hotels.reduce((result, hotels) => {
    result[hotels.country]
      ? result[hotels.country].push(hotels.city)
      : (result[hotels.country] = [hotels.city]);

    return result;
  }, {});

console.log(searchUnique(hotels));

console.log('----------');

function month(day, daysInMonth, daysInWeek, checkIn, checkOut) {
  if (day > daysInWeek) {
    throw new Error('День больше количества дней в неделе');
  }
  const monthArr = [];
  if (day > 1 && day <= daysInWeek) {
    const weekArr = [];
    let prevMonth = daysInMonth - day;
    while (prevMonth <= daysInMonth) {
      const dayInfo = {
        dayOfMonth: prevMonth,
        notCurrentMonth: true,
        selectedDay: false,
      };
      prevMonth++;
      weekArr.push(dayInfo);
      day = 1;
    }
    if (weekArr.length < daysInWeek) {
      while (weekArr.length < daysInWeek && day <= daysInMonth) {
        const selectCheck = day >= checkIn && day <= checkOut;
        const dayInfo = {
          dayOfMonth: day,
          notCurrentMonth: false,
          selectedDay: selectCheck,
        };
        weekArr.push(dayInfo);
        day++;
      }
    }
    monthArr.push(weekArr);
  }
  while (day < daysInMonth) {
    monthArr.push(week(day, daysInMonth, daysInWeek, checkIn, checkOut));
    day += daysInWeek;
  }
  return monthArr;
}

function week(day, daysInMonth, daysInWeek, checkIn, checkOut) {
  const weekArr = [];
  let nextMonth = 1;
  while (weekArr.length < daysInWeek) {
    if (weekArr.length < daysInWeek && day <= daysInMonth) {
      const selectCheck = day >= checkIn && day <= checkOut;
      const dayInfo = {
        dayOfMonth: day,
        notCurrentMonth: false,
        selectedDay: selectCheck,
      };
      weekArr.push(dayInfo);
      day++;
    } else if (day > daysInMonth) {
      const dayInfo = {
        dayOfMonth: nextMonth,
        notCurrentMonth: true,
        selectedDay: false,
      };
      weekArr.push(dayInfo);
      nextMonth++;
    }
  }
  return weekArr;
}

console.log(month(2, 30, 7, 15, 25));
