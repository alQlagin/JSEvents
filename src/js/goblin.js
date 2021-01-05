'use strict';

export default class goblin {
  constructor(gameBoardSize) {
    this.gameBoardSize = gameBoardSize;
    this.previousCellElement = Number();
    this.nextCellElement = Number();
  }

  static getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getNextGoblinPosition() {
    let result = false;
    while (result === false) {
      this.nextCellElement = goblin.getRandomNumber(0, this.gameBoardSize ** 2 - 1);
      if (this.nextCellElement !== this.previousCellElement) { result = true }
    }
    return this.nextCellElement;
  }
}
