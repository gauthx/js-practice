const dob = { dd: 5, mm: 5, cc: 20, yy: 25 };
const formulaes = [
  (obj) => obj.yy + 1,
  (obj) => obj.cc - 1,
  (obj) => obj.mm - 3,
  (obj) => obj.dd + 3,
  (obj) => obj.mm - 2,
  (obj) => obj.dd + 2,
  (obj) => obj.yy + 2,
  (obj) => obj.cc - 2,
  (obj) => obj.cc + 1,
  (obj) => obj.yy - 1,
  (obj) => obj.dd + 1,
  (obj) => obj.mm - 1,
];
