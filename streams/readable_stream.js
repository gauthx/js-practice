const decoder = new TextDecoder();

for await (const chunk of Deno.stdin.readable) {
  console.log(decoder.decode(chunk));
}
