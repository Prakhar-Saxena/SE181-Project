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
var piece = game.thisBoard.getPiece(1,0);
//Proves out move logic for right
var moves = [ [1,2] , [1,3] , [1,5] ];
var validMoves = game.thisBoard.validateMoves(piece, moves);
console.log(validMoves);

