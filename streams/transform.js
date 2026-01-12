const transform = new TransformStream({
  transform: (chunk, controller) => {
    const string = new TextDecoder().decode(chunk);
    const upperCased = string.toUpperCase();
    controller.enqueue(upperCased);
  },
});

Deno.stdin.readable.pipeThrough(transform).pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);
