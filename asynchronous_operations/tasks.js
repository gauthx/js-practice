const getFruit = (name) => {
  const fruits = {
    "apple": "🍎",
    "pineapple": "🍍",
    "mango": "🥭",
    "kiwi": "🥝",
  };
  return fruits[name];
};

const createTask = (fruitName) =>
  new Promise((resolve) => resolve(getFruit(fruitName)));

console.log(createTask("apple"));

const tasks = [
  { mode: "serial", log: ["kiwi"] },
  { mode: "parallel", log: ["apple", "mango"] },
  { mode: "serial", log: ["pineapple"] },
];
