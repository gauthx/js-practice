await Deno.stdin.setRaw(true, { cbreak: true });
for await (const chunk of Deno.stdin.readable) {
  console.log(chunk)
}