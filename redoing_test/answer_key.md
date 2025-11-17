1. Write a function that sorts an array of numbers in descending order

```js
const sortAscending = x => x.sort((a, b) => b - a);
```

2. Write a function that returns a new sorted array such that even numbers appear in ascending order first and then the odd numbers appear in descending order next.
   Ex: [4,2,1,3,7] => [2,4,7,3,1]

```js
const isEven = x => x % 2 === 0;
const customOrder = (a, b) => {
  if (isEven(a) && isEven(b)) return a - b;
  if (!isEven(a) && !isEven(b)) return b - a;
  return isEven(a) ? -1 : 1;
};

const sortCustomOrder = a => a.toSorted(customOrder);
```

3. Write a function that finds the square roots of all numbers with perfect integer square roots.
   Ex: [1,15,64,55] => [1,8] // Only 1 and 64 have perfect integer square roots

```js
const hasPerfectSquareRoot = x => Math.floor(Math.sqrt(x)) === Math.sqrt(x);
const perfectSquareRoots = squares => squares.filter(hasPerfectSquareRoot);
```

4. Write a function that finds all the common elements between two arrays. Assume none of the elements repeat.
   Ex: [1,2,3] and [2,3,4] => [2,3]

```js
const commonElements = (a, b) => a.filter(x => b.includes(x));
```

5. Write a function that finds all elements of the first array that do not exist in the second.
   Ex: [1,2,3] and [2,3,4] => [1]

```js
const diff = (a, b) => a.filter(x => !b.includes(x));
```

6. Write a function that inserts the index of every character in a string before the character
   Ex: "abcd" => "0a1b2c3d"

```js
const insertIndex = str =>
  str
    .split('')
    .map((x, i) => i + x)
    .join('');
```

7. Given an array of 2d points, find the pair of points that are closest to another.
   Ex: [[0,0],[1,1],[5,0],[1,0]] => [[0,0],[1,0]]

```js
const sqr = x => x * x;
const distBetween = ([a, b], [c, d]) => Math.sqrt(sqr(c - a) + sqr(d - b));

const closerPair = ([a, b], [c, d]) =>
  distBetween(a, b) <= distBetween(c, d) ? [a, b] : [c, d];

const isSamePoint = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const closestPoint = (points, point) =>
  points.reduce(
    (closest, p) =>
      isSamePoint(p, point)
        ? closest
        : closerPair([closest, point], [p, point])[0],
    [Infinity, Infinity]
  );

const closestPoints = points =>
  points.map(p => [p, closestPoint(points, p)]).reduce(closerPair);
```

8. Find all the vowels in an array of sentences.
   Ex: ["this","that","those"] => ['i','a','o','e']

```js
const isVowel = x => 'aeiou'.includes(x.toLowerCase());
const allVowels = words => words.flatMap(x => x.split('')).filter(isVowel);
```

9. Group consecutive ascending numbers into arrays of their own
   Ex: [1,2,3,1,7,8,7,10] => [[1,2,3],[1,7,8],[7,10]]

```js
const ascendingRuns = numbers => {
  return numbers.reduce((a, x) => {
    const l = a[a.length - 1];
    if (l && l.length > 0 && x > l[l.length - 1]) l.push(x);
    else {
      a.push([x]);
    }
    return a;
  }, []);
};
```

10. Write a function that gives me the sum of the indices of the first and the last even numbers:
    Ex: [1,2,3,4,2,1] => 5 (2 occurs at index 1 and index 4);

```js
const sumOfEvenNumberEnds = x => x.findIndex(isEven) && x.findLastIndex(isEven);
```

11. Write a function that provides the sum of squares of all odd numbers in an array.
    Ex: [1,2,3,4] => 10

```js
const isOdd = x => x % 2 === 1;
const sqr = x => x * x;
const sum = (a, b) => a + b;
const sumOfOddSquares = x => x.filter(isOdd).map(sqr).reduce(sum, 0);
```

---

12. [0, 1, 2, 1, 2, 3, 2, 3, 4]

13. **Error (`c` is not defined)**

14.

[['a','c']]
[['a',['a']],['b','b']]

15. [1, 1, undefined, 1]

16. ['string']

17.

1
a
a
RangeError: Maximum call stack size exceeded

18. 12

19. [1,2,3,4,0,1,2,3,4]

20.

2
undefined
undefined
