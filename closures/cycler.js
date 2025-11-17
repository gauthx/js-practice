const makeCycler = (array) => {
  let i = 0;
  return () => {
    return array[i++ % array.length];
  };
};
