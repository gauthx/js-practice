console.log("before reading...");
Deno.readTextFile("./file.txt").then((x) => console.log(x));

const p1 = new Promise((resolve) => {
  console.log("Inside creation of promise1");
  resolve(21);
}).then((x) => console.log(x));
console.log("after reading");

const p2 = new Promise((resolve) => {
  console.log("Inside creation of promise2");
 Promise.resolve(67);
}).then((x) => console.log(x));

Promise.resolve(33).then(x => console.log(x))
