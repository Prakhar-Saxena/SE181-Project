import Board from './board.js';
import * as pieces from './piece.js';

class Game{

    constructor(){
        this.thisBoard = new Board();
        console.log(this.thisBoard.board);
    }

    start(){
        this.currentPlayer = 0;
    }

    endTurn(){
        if(this.currentPlayer == 0){

        }
    }

}


var game = new Game();
game.start();

