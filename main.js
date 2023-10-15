console.log('6. Работа с переменными:');

let user = 'John Doe';

console.log(user);

const student = 'Vladyslav Davydkin';

console.log(student);

user = student;

console.log(user);

console.log('7. Работа с примитивами:');

let test = 1;
test += 1;
console.log(test);
test -= 1;
console.log(test);
console.log(!!test);

console.log('8. Дан массив. найдите произведение элементов этого массива:');

const array = [2, 3, 5, 8];
let result = 0;
for (let i = 0; i < array.length; i++) {
  result += array[i];
}
console.log(result);

console.log('9. Дан массив. выведите в консоль те элементы массива, которые больше 5-ти, но меньше 10-ти');

const array2 = [2, 5, 8, 15, 0, 6, 20, 3];
for (let i = 0; i < array2.length; i++) {
  if (array2[i] > 5 && array2[i] < 10) {
    console.log(array2[i]);
  }
}

console.log('10. Дан массив. выведите в консоль четные элементы массива.');

for (let i = 0; i < array2.length; i++) {
  if (array2[i] % 2 === 0) {
    console.log(array2[i]);
  }
}
