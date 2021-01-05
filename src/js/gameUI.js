'use strict';

export default class gameUI {
  constructor(gameContainer) {
    this.gameBoardSize = 4;
    this.gameContainer = gameContainer;
    this.gameBoardEl = [];
    this.gameBoardCells = [];
    this.cellEnterListeners = [];
    this.cellLeaveListeners = [];
    this.cellClickListeners = [];
    this.winsNumber = 0;
    this.lossesNumber = 0;
  }

  init() {
    this.gameContainer.innerHTML =
      `
      <div class="controls">
        <span class="span">Побед: </span><span data-id="wins" class="span">${this.winsNumber}</span><br/>
        <span class="span">Поражений: </span><span data-id="losses" class="span">${this.lossesNumber}</span>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.gameBoardEl = this.gameContainer.querySelector('[data-id=board]');
    this.wins =this.gameContainer.querySelector('[data-id=wins]');
    this.losses =this.gameContainer.querySelector('[data-id=losses]');

    this.gameBoardEl.classList.add('prairie');
    for (let i = 0; i < this.gameBoardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile', 'map-tile-center');
      cellEl.addEventListener('mouseenter', event => this.onCellEnter(event));
      cellEl.addEventListener('mouseleave', event => this.onCellLeave(event));
      cellEl.addEventListener('click', event => this.onCellClick(event));
      this.gameBoardEl.appendChild(cellEl);
    }

    this.gameBoardCells = Array.from(this.gameBoardEl.children);
  }

  redrawUI(nextCellElPosition) {
    const cellEl = this.gameBoardEl.children[nextCellElPosition];
    const charEl = document.createElement('div');
    charEl.classList.add('character', 'Goblin');
    cellEl.appendChild(charEl);
  }

  updateStats(type) {
    if (type === 'wins') {
      this.winsNumber += 1;
      this.wins.innerText = this.winsNumber;
    } else {
      this.lossesNumber += 1;
      this.losses.innerText = this.lossesNumber;
    }
  }

  addCellEnterListener(callback) {
    this.cellEnterListeners.push(callback);
  }

  addCellLeaveListener(callback) {
    this.cellLeaveListeners.push(callback);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellEnter(event) {
    event.preventDefault();
    const index = this.gameBoardCells.indexOf(event.currentTarget);
    this.cellEnterListeners.forEach(o => o.call(null, index));
  }

  onCellLeave(event) {
    event.preventDefault();
    const index = this.gameBoardCells.indexOf(event.currentTarget);
    this.cellLeaveListeners.forEach(o => o.call(null, index));
  }

  onCellClick(event) {
    const index = this.gameBoardCells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach(o => o.call(null, index));
  }
}
