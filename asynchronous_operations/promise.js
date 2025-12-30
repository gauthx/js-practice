import * as fs from 'node:fs';   

const fileContents = fs.readFile("./file.txt","utf8",(err,data)=>{console.log(err,data)});
console.log("File contents are", fileContents);
