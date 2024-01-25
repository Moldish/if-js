import month from './main-calendar';

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
  const checkInSpace = document.getElementById('check-in');
  const checkOutSpace = document.getElementById('check-out');
  const cellsTd = document.querySelectorAll('.cellDate');
  //
  let checkIn = null;
  let checkOut = null;
  const days = [];
  //
  cellsTd.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      const selectedNumber = parseInt(event.target.innerText, 10);
      //
      if (!checkIn) {
        if (selectedNumber > new Date().getDate()) {
          checkIn = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          checkInSpace.innerText = `${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
          checkOutSpace.innerText = 'Check-out';
        }
      } else if (!checkOut) {
        if (selectedNumber < checkIn) {
          if (selectedNumber > new Date().getDate()) {
            checkOut = checkIn;
            checkIn = selectedNumber;
            event.target.classList.add('calendar-element-selected-first');
            checkInSpace.innerText = `${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
            checkOutSpace.innerText = `${checkOut}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
            const min = Math.min(checkIn, checkOut);
            const max = Math.max(checkIn, checkOut);
            //
            for (let i = min + 1; i < max; i += 1) {
              days.push(i);
              cellsTd[i - 1].classList.add('calendar-element-selected');
            }
          }
        } else if (!checkOut) {
          checkOut = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          checkInSpace.innerText = `${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
          checkOutSpace.innerText = `${checkOut}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
          //
          const min = Math.min(checkIn, checkOut);
          const max = Math.max(checkIn, checkOut);
          //
          for (let i = min + 1; i < max; i += 1) {
            days.push(i);
            cellsTd[i - 1].classList.add('calendar-element-selected');
          }
        }
      } else {
        cellsTd.forEach((cell) => {
          cell.classList.remove('calendar-element-selected-first', 'calendar-element-selected');
          checkIn = null;
          checkOut = null;
          checkInSpace.innerText = 'Check-in';
          checkOutSpace.innerText = 'Check-out';
        });
        //
        if (selectedNumber > new Date().getDate()) {
          checkIn = selectedNumber;
          event.target.classList.add('calendar-element-selected-first');
          checkInSpace.innerText = `${checkIn}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
          checkOutSpace.innerText = 'Check-out';
        }
      }
    });
  });
}

getCalendar();
