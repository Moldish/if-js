function checkBrackets(string) {
  function clearString(originString) {
    const regex = /[^{}]+/g;
    return originString.replace(regex, '');
  }

  const cleanString = clearString(string);

  const brackets = {
    '}': '{',
  };
  //
  function isClosedBracket(bracket) {
    return (bracket) === '}';
  }
  //
  const stack = [];
  //
  for (let i = 0; i < cleanString.length; i++) {
    const current = cleanString[i];
    if (isClosedBracket(current)) {
      if (brackets[current] !== stack.pop()) return false;
    } else {
      stack.push(current);
    }
  }
  return stack.length === 0;
}

const s1 = '{user: {name: }{"John", age: 21{}}';
const s2 = '{user: {name: "John", age: 21}}';

console.log(checkBrackets(s1));
console.log(checkBrackets(s2));
