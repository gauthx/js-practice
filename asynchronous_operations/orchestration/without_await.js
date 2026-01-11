const task = (desc, secs) => {
  return new Promise((resolve) => {
    const start = Date.now();
    setTimeout(() => {
      const end = Date.now();
      resolve({ desc, start, end, duration: end - start });
    }, secs * 1000);
  }).then(console.log);
};

const TASKS = {
  "task1": () => createTask("task1", 2),
  "task2": () => createTask("task2", 3),
};

const tasks = ["task1", "task2"];

const main = () => {
  tasks.reduce((reduced, task) => reduced.then(TASKS[task]), Promise.resolve());
};

main();
