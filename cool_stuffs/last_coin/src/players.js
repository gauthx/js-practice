export class Players {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  switchPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  }
}
