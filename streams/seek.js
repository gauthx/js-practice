const file = await Deno.open("sample.txt", { read: true });

let cursor = await file.seek(6, Deno.SeekMode.Start);
console.log({ cursor });
cursor = await file.seek(6, Deno.SeekMode.Current);
const buffer = new Uint8Array(10);
file.read(buffer);
console.log(new TextDecoder().decode(buffer));
