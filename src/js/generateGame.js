'use strict';

export default class generateGame {
  constructor(goblin, boardGame) {
    this.goblin = goblin;
    this.boardGame = boardGame;
    this.interval = Number;
    this.wins = Number();
    this.losses = Number();
  }

  game() {
    setInterval(() => {
      for (const cell of this.boardGame.gameBoardCells) {
        cell.innerHTML = '';
      }
      this.boardGame.redrawUI(this.goblin.getNextGoblinPosition());
      return this.interval;
    }, 1000)

    this.kickCell();
    this.focusCell();
    this.leaveCell();
  }

  kickCell() {
    this.boardGame.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    let cellEl = this.boardGame.gameBoardCells[index];
    if (cellEl.children.length > 0) {
      let character = this.boardGame.gameBoardCells[index].children[0];
      if (character.classList.contains('Goblin')) {
        character.classList.remove('character', 'Goblin');
        cellEl.classList.add('selected', 'selected-kicked');
        this.wins += 1;
      }
    } else {
      this.losses += 1;
    }
    if (this.wins === 5) {
      this.boardGame.updateStats('wins');
      this.wins = 0;
      this.losses = 0;
    } else if (this.losses === 5) {
      this.boardGame.updateStats('losses');
      this.wins = 0;
      this.losses = 0;
    }
  }

  focusCell() {
    this.boardGame.addCellEnterListener(this.onCellEnter.bind(this));
  }

  onCellEnter(index) {
    let cellEl = this.boardGame.gameBoardCells[index];
    if (cellEl.children.length > 0) {
      let character = this.boardGame.gameBoardCells[index].children[0];
      if (character.classList.contains('Goblin')) {
        cellEl.style.cursor = 'crosshair';
      }
    } else {
      cellEl.style.cursor = 'pointer';
    }
  }

  leaveCell() {
    this.boardGame.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  onCellLeave(index) {
    let cellEl = this.boardGame.gameBoardCells[index];
    cellEl.classList.remove(...Array.from(cellEl.classList)
      .filter(o => o.startsWith('selected')));
  }
}
