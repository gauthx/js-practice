const delay = (val, secs) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val);
    }, secs * 1000);
  });
};

const d1 = delay(5, 2);
const d2 = delay(15, 4);
const d3 = delay(5, 6);

Promise.all([d1,d2,d3]).then(x => console.log(x))
