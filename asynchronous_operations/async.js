const p = await Promise.resolve(5).then(console.log);
console.log("When will this work?");

const anAsyncFunc = async () => {
};

const p2 = Promise.resolve(3).then(
  (fulfilled) => console.log(fulfilled),
  (rejected) => console.log("rejected", rejected),
);

const chain = Promise.resolve(2).then(console.log).then(console.log).catch(
  (x) => console.log("caught", x),
);

const resolveAfter2Seconds = () => {
  return new Promise((resolve) => setTimeout(() => resolve("Resolved"), 2000));
};
