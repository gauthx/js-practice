const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue({ id: 1 });
    console.log(controller);
  },

  pull(controller) {
    console.log(controller)
    controller.enqueue({ id: 1 });
  },
}, {
  highWaterMark: 5,
  size() {
    return 1; // each chunk counts as 1
  },
});
