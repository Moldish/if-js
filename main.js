const colorArr = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue']

const colorsChange = {
  data: colorArr,
  from: 0,
  to: colorArr.length,

  [Symbol.iterator]() {
    return this;
  },

  next() {
    if (this.current === undefined) {
      this.current = this.from;
    }

    if (this.current < this.to) {
      return {
        done: false,
        value: this.data[this.current++],
      };
    }

    if (this.current === this.to) {
      this.current = 0;

      return {
        done: false,
        value: this.data[this.current],
      };
    }
  },
};

const changeStyle = colors => event => {
  event.target.style.color = colors.next().value;
  return event;
};

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

text1.addEventListener('click', changeStyle({...colorsChange}));
text2.addEventListener('click', changeStyle({...colorsChange}));
text3.addEventListener('click', changeStyle({...colorsChange}));

//-----------------------------//

function month(day, daysInWeek, checkIn, checkOut) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let prevMonthDays = monthDays[new Date().getMonth() - 1];
  let currentMonthDays = monthDays[new Date().getMonth()];
  if (day > daysInWeek) {
    throw new Error('День больше количества дней в неделе');
  }
  let monthArr = [];
  if (day > 1 && day <= daysInWeek) {
    let weekArr = [];
    let prevMonth = prevMonthDays - day + 2;
    while (prevMonth <= prevMonthDays) {
      let currenDayCheck = day === new Date().getDate()
      let dayInfo = {
        dayOfMonth: prevMonth,
        notCurrentMonth: true,
        selectedDay: false,
        currentDay: currenDayCheck
      };
      prevMonth++;
      weekArr.push(dayInfo);
      day = 1;
    }
    if (weekArr.length < daysInWeek) {
      while (weekArr.length < daysInWeek && day <= currentMonthDays) {
        let currenDayCheck = day === new Date().getDate()
        let selectCheck = day >= checkIn && day <= checkOut;
        let dayInfo = {
          dayOfMonth: day,
          notCurrentMonth: false,
          selectedDay: selectCheck,
          currentDay: currenDayCheck
        };
        weekArr.push(dayInfo);
        day++;
      }
    }
    monthArr.push(weekArr);
  }
  while (day < currentMonthDays) {
    monthArr.push(week(day, currentMonthDays, daysInWeek, checkIn, checkOut));
    day += daysInWeek;
  }
  return monthArr;
}

function week(day, currentMonthDays, daysInWeek, checkIn, checkOut) {
  let weekArr = [];
  let nextMonth = 1;
  while (weekArr.length < daysInWeek) {
    if (weekArr.length < daysInWeek && day <= currentMonthDays) {
      let currenDayCheck = day === new Date().getDate()
      let selectCheck = day >= checkIn && day <= checkOut;
      let dayInfo = {
        dayOfMonth: day,
        notCurrentMonth: false,
        selectedDay: selectCheck,
        currentDay: currenDayCheck
      };
      day++
      weekArr.push(dayInfo);
    }
    else {
      let currenDayCheck = day === new Date().getDate()
      let selectCheck = day >= checkIn && day <= checkOut;
      let dayInfo = {
        dayOfMonth: nextMonth,
        notCurrentMonth: true,
        selectedDay: selectCheck,
        currentDay: currenDayCheck
      };
      nextMonth++;
      weekArr.push(dayInfo);
    }
  }
  return weekArr;
}

console.log(month(3, 7, 9, 16))
