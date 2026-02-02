const ack = (m, n) => {
  if (m === 0) {
    return n + 1;
  } else if ((m > 0) && (n === 0)) {
    return ack(m - 1, 1);
  } else if ((m > 0) && (n > 0)) {
    return ack(m - 1, ack(m, n - 1));
  }
};

const main = () => {
  for (let m = 0; m < 6; m++) {
    for (let n = 0; n < 6; n++) {
      console.log(
        `Result for Ackermann func when m is ${m} and n is ${n} = `,
        ack(m, n),
      );
    }
  }
}

main();
