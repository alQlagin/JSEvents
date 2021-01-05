'use strict';

import gameUI from "./gameUI";
import goblin from "./goblin";
import generateGame from "./generateGame";


const boardGame = new gameUI(document.querySelector('#game-container'));
boardGame.init();

const goblinCharacter = new goblin(boardGame.gameBoardSize);

const game = new generateGame(goblinCharacter, boardGame);
game.game();
