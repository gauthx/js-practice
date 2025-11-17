const printSquare = (sqr) => {
  return sqr.reduce(
    (grp, x) =>
      grp[grp.length - 1].length < 4
        ? grp[grp.length - 1].push(x) && grp
        : grp.push([x]) && grp,
    [[]],
  ).map((x) => x.join("\t")).join("\n");
};

const takeUserInput = () => {
  const dobInput = prompt("Enter your date of birth in dd-mm-yyyy order");
  const dd = parseInt(dobInput.slice(0, 2));
  const mm = parseInt(dobInput.slice(3, 5));
  const cc = parseInt(dobInput.slice(6, 8));
  const yy = parseInt(dobInput.slice(8, 10));

  return { dd, mm, cc, yy };
};

function main() {
  const dob = takeUserInput();
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

  console.log(printSquare(magicSquare));
}

main();
