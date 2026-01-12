const reader1 = Deno.stdin.readable.getReader();
const val1 = await reader1.read();
console.log(val1);

reader1.releaseLock();
const reader2 = Deno.stdin.readable.getReader();
reader2.read();
