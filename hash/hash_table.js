const membership = (hashSet, candidate) => {
  const indexToCheck = hash(candidate);
  return hashSet[indexToCheck] === candidate;
};

const hash = (string) => {
  const sumOfUnicodes = [].reduce.call(
    string,
    (sum, char) => sum + char.charCodeAt(),
    0,
  );

  return sumOfUnicodes % 10;
};

const main = () => {
  const fruits = ["pineapple", "banana", "mango"];
  const hashSet = [];

  for (const fruit of fruits) {
    const indexToInsert = hash(fruit);
    hashSet[indexToInsert] = fruit;
  }

  console.log({ hashSet });

  console.log("Checking membership of apple :", membership(hashSet, "pineapple"));
  console.log("Checking membership of litchi :", membership(hashSet, "litchi"));
};

main();
