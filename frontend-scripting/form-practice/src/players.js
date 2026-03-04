export default class Players {
  #players;
  constructor() {
    this.#players = [];
  }

  register(name, club, nation) {
    this.#players.push({ name, club, nation });
  }

  getAll() {
    return structuredClone(this.#players);
  }
}
