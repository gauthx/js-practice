const file = await Deno.open("sample.txt", { read: true });

file.readable.pipeTo(Deno.stdout.writable); // creating a file stream and piping to stdout
