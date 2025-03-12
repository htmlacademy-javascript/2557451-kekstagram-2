function validateStroke(stroke, maxLength) {
  return maxLength === stroke.length;
}

function validatePalindrom(word) {
  let wordWithoutSpace = word.replaceAll(' ', '');
  let downRegister = wordWithoutSpace.toLowerCase();
  let reversedWord = '';

  for (let i = downRegister.length - 1; i >= 0; i--) {
    reversedWord += downRegister[i]
  }

  return reversedWord === downRegister;
}

function getSomething (symbols) {
  let getNum = '';

  for (let i = 0; i <= symbols.length ; i++) {
    let num = parseInt(symbols[i]);

    if (!isNaN(num)) {
      getNum += num;
    }
  }

  return getNum || NaN;
}

console.log(validateStroke('привет', 6));
console.log(validatePalindrom('ДовОд'));
console.log(getSomething('я томат'));


