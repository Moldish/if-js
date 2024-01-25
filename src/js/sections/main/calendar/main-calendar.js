export default function month(daysInWeek, checkIn, checkOut) {
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
