const task = (taskName, time, shouldFail = false) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`${taskName} failed`));
        }
        resolve(`${taskName} successfull`);
      }, time);
    });
  };
};

const TASKS = [task("A", 2000), task("B", 1500, true), task("C", 1000)];

const runTasks = async (tasks, mode) => {
  const output = { results: [], errors: [] };
  if (mode === "serial") {
    for (const task of tasks) {
      try {
        const res = await task();
        output.results.push(res);
      } catch (err) {
        output.errors.push(err);
      }
    }
  }

  await Promise.all(
    tasks.map((task) =>
      task().then((res, j) => {
        output.results.push(res);
        output.results.push(j);
      })
    ),
  );
  return output;
};
