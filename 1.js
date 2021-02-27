function checkPalindrom(number) {
  // reverse number
  const reversedNum =
    parseFloat(number.toString().split("").reverse().join("")) *
    Math.sign(number);
  // check number palindrom
  if (number == reversedNum) {
    console.log(`${number} merupakan bilangan palindrom`);
  } else {
    console.log(`${number} merupakan bukan bilangan palindrom`);
  }
}

checkPalindrom(1001);
