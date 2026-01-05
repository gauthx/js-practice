function red(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}

class Debugger {
  log(msg = "default msg", x) {
    console.log(msg , " : ", x, "\n");
    return x;
  }
  pause() {
    prompt(red("paused execution"));
  }
}

export const dbg = new Debugger();
