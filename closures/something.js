const createAccount = () => {
  let balance = 1000;
  const withdraw = (amount) => {
    balance = balance - amount;
  };
  const deposit = (amount) => {
    balance = balance + amount;
  };
  const displayBalance = () => {
    console.log(balance);
  };

  return { withdraw, deposit, displayBalance };
};


