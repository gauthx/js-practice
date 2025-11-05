const islessThan = function (number1, number2) {
  return number1 < number2;
}

const isStringLengthLessThan = function (string1, string2) {
  return string1.length < string2.length;
}

function sort(data, criteria) {
  const sorted = data.slice();

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      if (criteria(sorted[j], sorted[i])) {
        const temp = sorted[j];
        sorted[j] = sorted[i];
        sorted[i] = temp;

      }
    }
  }

  return sorted;
}

function main() {
  console.log(sort([3, 1, 2], islessThan));

  console.log(sort(["abc", "a", "ab"], isStringLengthLessThan));
}

main();
