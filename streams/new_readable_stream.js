console.log(new TextDecoder())

const underlyingSource = {
  start(controller) {
    controller.enqueue(new TextEncoder().encode("start initialization"));
  },
  pull(controller) {
    console.log(controller)
    controller.enqueue(new TextEncoder().encode("pulling.."))
    controller.close()
  }
};

const queueingStrategy = {
  highWaterMark: 4,
}

const readableStream = new ReadableStream(underlyingSource,queueingStrategy);
readableStream.pipeTo(Deno.stdout.writable);
