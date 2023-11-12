console.log('5. Функция palindrome');
function palindrome(w) {
  let lastSymbol = w.length - 1;
  for (let i = 0; i < w.length; i++) {
    if (w[i] !== w[lastSymbol - i]) {
      return false;
    }
  }
  return true;
}

console.log(palindrome('шалаш'));

console.log('6. Функция min(a, b) и функция max(a,b)');

function min(a, b) {
  if (a < b) {
    console.log(a);
  } else {
    console.log(b);
  }
}

min(10, 9);

console.log('--------------');

function max(a, b) {
  b > a ? console.log(b) : console.log(a);
}

max(4, 2);

console.log('7. Замена элементов массива. напишите функцию, которая будет заменять все 0 на строку \'zero\'');

const generateArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

function replacer(array) {
  let str = array.join(', ')
  let output = ''
  for (let i = 0; i < str.length; i ++) {
    if (str[i] === '0') {
      output += 'zero'
    }
    else {
      output += str[i]
    }
  }
  console.log(output)
}

replacer(generateArray(10, 100));