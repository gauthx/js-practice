function red(text) {
  return "\x1B[31m" + text + "\x1B[0m";
}

export class Debugger {
  log(x, msg = "default msg") {
    console.log(x, msg);
    return x;
  }
  pause() {
    prompt(red("paused execution"));
  }
}

