const array = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
const result = [];
const arrayJoin = array.join().split(",").sort();

// slice array join of 3 part
for (i = 0; i < arrayJoin.length; i += 3) {
  let tempArray = arrayJoin.slice(i, i + 3);
  result.push(tempArray);
}
console.log(result);
