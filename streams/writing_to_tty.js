const x = await Deno.open("/dev/ttys001", { write: true });
console.log(x.isTerminal());
await x.write(new TextEncoder().encode("hello"));
x.close();
