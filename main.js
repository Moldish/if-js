console.log('5. Напишите функцию sum, которая возвращает сумму чисел');

function sum(num) {
  let result = num;
  function add(addNum) {
    result += addNum;
    console.log(result);
    return add;
  }
  return add;
}

sum(2)(3);

console.log('6. Покрасьте абзацы по клику');

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

let currentColor = -1;
function getColour() {
  const colors = ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'];
  currentColor++;
  if (currentColor > colors.length - 1) {
    currentColor = 0;
  }
  return colors[currentColor];
}

text1.addEventListener('click', (event) => {
  event.target.style.color = getColour();
});
text2.addEventListener('click', (event) => {
  event.target.style.color = getColour();
});
text3.addEventListener('click', (event) => {
  event.target.style.color = getColour();
});
