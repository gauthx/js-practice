import { brightGreen } from "jsr:@std/fmt/colors";

export const displayDescription = () => {
  const kaprekarDescription = `About Kaprekar's Constant

Kaprekar's constant is the number ${brightGreen("6174")}, discovered by the Indian mathematician D. R. Kaprekar.
It has a fascinating property:

1. Take any 4-digit number (with at least two different digits).
2. Rearrange its digits to form the largest and smallest possible numbers.
3. Subtract the smaller number from the larger one.
4. Repeat the process with the result.

No matter which valid number you start with, you will always reach 6174 in a finite number of steps—and once you reach 6174, the process loops forever (7641 − 1467 = 6174).

This iterative process is known as Kaprekar's routine, and 6174 is the unique fixed point for 4-digit numbers.
`;

  console.log(kaprekarDescription);
};
