async function f() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

async function g() {
  console.log("C");
  await f();
  console.log("D");
}

console.log("F");

g();

console.log("G");
