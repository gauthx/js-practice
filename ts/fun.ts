const compose =
  <GRes, T extends unknown[]>(f: (x: GRes) => any , g: (...args: T) => GRes) =>
  (...args: T) =>
    f(g(...args));

const juxt =
  <FRes, GRes, T extends unknown[]>(f: (...args: T) => FRes, g: (...args: T) => GRes) =>
  (...args: T): [FRes, GRes] => [f(...args), g(...args)];

const applyTwice = <FRes>(f: (arg: FRes) => FRes, x: FRes) => f(f(x));

const flip =
  <A, B, FRes>(f: (b: B, a: A) => FRes) =>
  (a: A, b: B):FRes =>
    f(b, a);

const constantly =
  <X>(x: X) =>
  (): X =>
    x;

const on =
  <GArg, GRes>(f: (gxres: GRes, gyRes: GRes) => any, g: (arg: GArg) => GRes) =>
  (x: GArg, y: GArg) =>
    f(g(x), g(y));

const pairWith =
  <X, FRes>(f: (x: X) => FRes) =>
  (x: X): [X, FRes] => [x, f(x)];

const tap =
  <X>(f: (x: X) => any) =>
  (x: X): X => {
    f(x);
    return x;
  };

const zipWith = <X>(f: (x: X, ele: any) => any, a1: any[], a2: any[]) =>
  a1.map((x: X, i: number) => f(x, a2[i]));

const prop =
  <V>(key: string) =>
  (obj: Record<string, V>) =>
    obj[key];

const wrap =
  <X, FRes>(f: (x: X) => FRes) =>
  (x: X) => {
    console.log(x);
    const result = f(x);
    console.log(result);
    return result;
  };

const fork =
  <X, FRes, GRes>(
    combine: (fx: FRes, gx: GRes) => any,
    f: (x: X) => FRes,
    g: (x: X) => GRes,
  ) =>
  (x: X) =>
    combine(f(x), g(x));

const increment = (x: number) => x + 1;
const isEven = (x: number): boolean => x % 2 === 0;
const repeat = (x: number, y: string) => y.repeat(x);
const len = (x: string) => x.length;
const not = (x: boolean) => !x;
const toUpper = (x: string) => x.toUpperCase();
const firstChar = (x: string) => x[0];
const toStr = (x: number) => x.toString();

// compose tests
const addTwo = compose(increment, increment);
const isOneAboveEven = compose(isEven, increment);
const isMaxEven = compose(isEven, Math.max);
const isMaxOdd = compose(not, isMaxEven);
const isRepeatedEven = compose(isEven, compose(len, repeat));
const shoutLength = compose(len, toUpper);
const firstCharIsEvenLength = compose(isEven, compose(len, firstChar));
const stringifiedIncrement = compose(toStr, increment);

// juxt tests
const bothMath = juxt(increment, increment);
const mathPair = juxt(increment, (x: number) => x * 2);
const evenAndOdd = juxt(isEven, compose(not, isEven));
const maxAndMin = juxt(Math.max, Math.min);
const lengthAndFirst = juxt(len, firstChar);
const a = juxt((x: number, y: string, z:number) => x + y, (x: number, y: string, z:number) => x + y)
a(2,"as", 3)

// applyTwice tests
const twiceInc = applyTwice(increment, 5);
const twiceNot = applyTwice(not, true);

// flip tests
const flippedRepeat = flip(repeat);
const flippedMax = flip(Math.max);

// constantly tests
const alwaysFive = constantly(5);
const alwaysHello = constantly("hello");

// on tests
const sumLengths = on((a, b) => a + b, len);
const compareLengths = on((a, b) => a > b, len);

// pairWith tests
const pairInc = pairWith(increment);
const pairLen = pairWith(len);

// tap tests
const tappedInc = tap(increment);
const tappedLog = tap(console.log);

// zipWith tests
const summed = zipWith((a, b) => a + b, [1, 2], [3, 4]);
const zippedStrings = zipWith((a, b) => a + b, ["a"], ["b"]);

// prop tests
const getName = prop("name");
const getAge = prop("age");

// wrap tests
const wrappedInc = wrap(increment);
const wrappedLen = wrap(len);

// fork tests
const sumAndMultiply = fork(
  (a, b) => a + b,
  (x: number) => x + 1,
  (x: number) => x * 2,
);

const evenAfterOps = fork((a, b) => a && b, isEven, compose(isEven, increment));
