const calendarBody = document.getElementById('calendar-body');

const coll = document.getElementsByClassName('calendar-opener');
for (let i = 0; i < coll.length; i += 1) {
  coll[i].addEventListener('click', function (event) {
    event.preventDefault();
    this.classList.toggle('active');
    const counterBody = this.nextElementSibling;
    if (counterBody.style.maxHeight) {
      counterBody.style.maxHeight = null;
    } else {
      counterBody.style.maxHeight = `${counterBody.scrollHeight}px`;
    }
  });
}

function month(daysInWeek, checkIn, checkOut) {
  const currentDate = new Date();
  currentDate.setDate(1);
  let day = currentDate.getDay();
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const prevMonthDays = monthDays[new Date().getMonth() - 1];
  const currentMonthDays = monthDays[new Date().getMonth()];
  const monthArr = [];
  //
  if (day >= 1 && day <= daysInWeek) {
    const weekArr = [];
    let prevMonth = prevMonthDays - day + 2;
    while (prevMonth <= prevMonthDays) {
      const currentDayCheck = day === new Date().getDate();
      const dayInfo = {
        dayOfMonth: prevMonth,
        notCurrentMonth: true,
        selectedDay: false,
        currentDay: currentDayCheck,
      };
      prevMonth += 1;
      weekArr.push(dayInfo);
      day = 1;
    }
    if (weekArr.length < daysInWeek) {
      while (weekArr.length < daysInWeek && day <= currentMonthDays) {
        const currentDayCheck = day === new Date().getDate();
        const selectCheck = day >= checkIn && day <= checkOut;
        const dayInfo = {
          dayOfMonth: day,
          notCurrentMonth: false,
          selectedDay: selectCheck,
          currentDay: currentDayCheck,
        };
        weekArr.push(dayInfo);
        day += 1;
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
  const weekArr = [];
  let nextMonth = 1;
  while (weekArr.length < daysInWeek) {
    if (weekArr.length < daysInWeek && day <= currentMonthDays) {
      const currentDayCheck = day === new Date().getDate();
      const selectCheck = day >= checkIn && day <= checkOut;
      const dayInfo = {
        dayOfMonth: day,
        notCurrentMonth: false,
        selectedDay: selectCheck,
        currentDay: currentDayCheck,
      };
      day += 1;
      weekArr.push(dayInfo);
    } else {
      const currentDayCheck = day === new Date().getDate();
      const selectCheck = day >= checkIn && day <= checkOut;
      const dayInfo = {
        dayOfMonth: nextMonth,
        notCurrentMonth: true,
        selectedDay: selectCheck,
        currentDay: currentDayCheck,
      };
      nextMonth += 1;
      weekArr.push(dayInfo);
    }
  }
  return weekArr;
}

function getCalendar() {
  const year = new Date().getFullYear();
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  const nameRow = calendarBody.insertRow();
  const nameCell = nameRow.insertCell();
  nameCell.colSpan = 7;
  nameCell.innerText = `${monthName[0].toUpperCase() + monthName.slice(1)} ${year}`;
  nameCell.classList.add('calendar-month-year');
  //
  const dayRow = calendarBody.insertRow();
  const weekDays = ['Mn', 'Tu', 'Wd', 'Th', 'Fr', 'Sa', 'Su'];
  weekDays.forEach((day) => {
    const dayCell = dayRow.insertCell();
    dayCell.innerText = day;
    dayCell.classList.add('calendar-elements');
  });
  //
  month(7)
    .forEach((calendarWeek) => {
      const row = calendarBody.insertRow();
      calendarWeek.forEach((day) => {
        const currentDay = new Date().getDate();
        const cell = row.insertCell();
        cell.classList.add('cellDate');
        if (day.notCurrentMonth === false) {
          cell.textContent = day.dayOfMonth;
        }
        if (day.currentDay === true) {
          cell.classList.add('calendar-element-current');
        }
        if (parseInt(day.dayOfMonth, 10) < currentDay) {
          cell.classList.add('calendar-element-inactive');
        }
        cell.classList.add('calendar-elements');
      });
    });
  //
  let checkIn = null;
  let checkOut = null;
  const days = [];
  const cellsTd = document.querySelectorAll('.cellDate');
  cellsTd.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      const selectedNumber = parseInt(event.target.innerText, 10);
      const calendarBtn = document.querySelector('.calendar-opener');
      //
      if (!checkIn) {
        if (selectedNumber > new Date().getDate()) {
          checkIn = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          calendarBtn.innerText = `📅 ${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()} — Check-out`;
        }
      } else if (!checkOut) {
        if (selectedNumber < checkIn) {
          if (selectedNumber > new Date().getDate()) {
            checkOut = checkIn;
            checkIn = selectedNumber;
            event.target.classList.add('calendar-element-selected-first');
            calendarBtn.innerText = `📅 ${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()} — ${checkOut}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
            const min = Math.min(checkIn, checkOut);
            const max = Math.max(checkIn, checkOut);
            //
            for (let i = min + 1; i < max; i += 1) {
              days.push(i);
              cellsTd[i + 3].classList.add('calendar-element-selected');
            }
          }
        } else if (!checkOut) {
          checkOut = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          calendarBtn.innerText = `📅 ${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()} — ${checkOut}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
          //
          const min = Math.min(checkIn, checkOut);
          const max = Math.max(checkIn, checkOut);
          //
          for (let i = min + 1; i < max; i += 1) {
            days.push(i);
            cellsTd[i + 3].classList.add('calendar-element-selected');
          }
        }
      } else {
        cellsTd.forEach((cell) => {
          cell.classList.remove('calendar-element-selected-first', 'calendar-element-selected');
          checkIn = null;
          checkOut = null;
          calendarBtn.innerText = '📅 Check-in — Check-out';
        });
        //
        if (selectedNumber > new Date().getDate()) {
          checkIn = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          calendarBtn.innerText = `📅 ${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()} — Check-out`;
        }
      }
    });
  });
}

getCalendar();
