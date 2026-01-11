async function f() {
  console.log("A");
  await new Promise((res) => {
    res("J");
  });
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
