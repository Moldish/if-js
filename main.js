const obj1 = {
  a: 'a',
  b: {
    a: 'a',
    b: 'b',
    c: {
      a: 1,
    },
  },
};
const obj2 = {
  b: {
    c: {
      a: 1,
    },
    b: 'b',
    a: 'a',
  },
  a: 'a',
};
const obj3 = {
  a: {
    c: {
      a: 'a',
    },
    b: 'b',
    a: 'a',
  },
  b: 'b',
};

const deepEqual = (object1, object2) => {
  for (const x in object1) {
    if (Object.prototype.hasOwnProperty.call(object1, x) !== Object.prototype.hasOwnProperty.call(object2, x)) return false;
    if (typeof object1[x] == 'object') {
      if (!deepEqual(object1[x], object2[x])) return false;
    }
  }
  return true;
};

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));

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
