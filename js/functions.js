function validateStroke(stroke, maxLength) {
  return stroke.length >= maxLength;
}

function validatePalindrom(word) {
  let wordWithoutSpace = word.replaceAll(' ', '');
  let downRegister = wordWithoutSpace.toLowerCase();
  let reversedWord = '';

  for (let i = downRegister.length - 1; i >= 0; i--) {
    reversedWord += word[i]
  }

  return reversedWord === word;
}

function getSomething (symbols) {
  let getNum = '';

  for (let i = 0; i <= symbols.length ; i++) {
    let num = parseInt(symbols[i]);

    if (!isNaN(num)) {
      getNum += num;
    }
  }
  if (getNum.length === 0) {
    return NaN;
  } else {
    return getNum;
  }
}

console.log(validateStroke('привет', 6));
console.log(validatePalindrom('топот'));
console.log(getSomething('а я-9. томат7869+01'));


