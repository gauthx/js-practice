import { Debugger } from "./dbg.js";
const dbg = new Debugger();

const a = () => console.log(5);

const b = () => {
  console.log(10);
};

const c = () => {
  console.log(15);
  dbg.pause();
};

a();
b(c());
