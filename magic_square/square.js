const dob = { dd: 5, mm: 5, cc: 20, yy: 25 };
const formulaes = [
  (obj) => obj.dd,
  (obj) => obj.mm,
  (obj) => obj.cc,
  (obj) => obj.yy,
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

const magicSquare = formulaes.map((formulae) => formulae(dob));

const printSquare = (sqr) => {
  return sqr.reduce(
    (grp, x) =>
      grp[grp.length - 1].length < 4
        ? grp[grp.length - 1].push(x) && grp
        : grp.push([x]) && grp,
    [[]],
  ).map((x) => x.join("\t")).join("\n");
};

console.log(printSquare(magicSquare));


