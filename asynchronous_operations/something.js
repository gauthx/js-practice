new Promise((resolveOuter) => {
console.log('creating promise');
  resolveOuter(
    new Promise((resolveInner) => {console.log('inside resolveouter');
      setTimeout(resolveInner, 1000);
    }),
  );
});
