import Board from './board.js';
import * as pieces from './piece.js';

var newBoard = new Board();
console.log(newBoard.board);

var pawn = newBoard.getPiece(1,0);
console.log( pawn.calcMove() );