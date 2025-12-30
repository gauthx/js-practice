function* range() {
  for (let i = 0; i < 5; i++) {
    yield i;
  }
}

const first5 = range();

function* consecutivePairs(list) {
  for (let i = 0; i < list.length - 1; i++) {
    yield [list[i], list[i + 1]];
  }
}

const consecutive = consecutivePairs([1, 2, 3]);
console.log([...consecutive]);

function* permutations(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      yield [list[i], list[j]];
    }
  }
}
const perms = permutations();
console.log(...perms);

function* cycler(list) {
  let i = 0;
  while (i <= Infinity) {
    yield list[i++ % list.length];
  }
}

function* iterateOverLines(text) {
  let start = 0;
  while (start < text.length) {
    const end = text.indexOf("\n", start);
    const actualEnd = end === -1 ? text.length : end;
    yield text.slice(start, actualEnd);
    start = actualEnd + 1;
  }
}

const iterateLines = iterateOverLines("this\nis\ngood");
console.log(...iterateLines);

function* partitionByIdentity(list) {
  let index = 0;
  while (index < list.length) {
    const partitioned = [list[index]];
    while (list[index + 1] === partitioned[0]) {
      partitioned.push(list[index + 1]);
      index += 1;
    }
    yield partitioned;
    index += 1;
  }
}

const isEven = (num) => !(num & 1);
const isOdd = (num) => num & 1;

function* partitionByOdd(list) {
  let index = 0;
  while (index < list.length) {
    const condition = isEven(list[index]) ? isEven : isOdd;
    const partitioned = [list[index]];
    while (condition(list[index + 1])) {
      partitioned.push(list[index + 1]);
      index += 1;
    }
    yield partitioned;
    index += 1;
  }
}

function* flippedConsecutive(list) {
  for (let index = 0; index < list.length; index += 2) {
    if (index === list.length - 1) {
      yield [list[index]];
    } else {
      yield [list[index + 1], list[index]];
    }
  }
}


function* chunk(list, size) {
  let index = 0;
  while (index < list.length) {
    yield list.slice(index, index + size)
    index += size;
  }
}

const chunkGenerator = chunk([1, 2, 3, 4, 5], 2);

function* f(x) {
 
  const sqr = x * x;
  while (true) {
    yield sqr;
    f(sqr);
  }
}
