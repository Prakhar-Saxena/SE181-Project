import * as Board from "../public/chess/board";
import * as Pieces from "../public/chess/piece";

describe('board', () => {
    it("pawnRow: Should create 8 pawns", () => {
        var row = []
        Board.pawnRow(row, 1, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
    it("newRow: Should create the back row of pieces", () => {
        var row = []
        Board.newRow(row, 0, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
	it("getPiece: Should return a piece", () => {
		var board = new Board.Board();
		board.initializeBoard();
		if(board.getPiece(0,0) == null){
			throw new Error('No piece found on initilization');
		}
	})
	it("validateMoves: Should return a set of valid moves", () => {
		var board = new Board.Board();
		board.initializeBoard();
		var moves = [ [3,0], [0,5] ];
		var thisPiece = board.getPiece(0,0);
		if(board.validateMoves(thisPiece, moves).length > 0){
			throw new Error('Moves validated incorrectly');
		}
	})
	it("isOnBoard: Should tell us if a coordinate is on the board", () => {
		var board = new Board.Board();
		if(board.isOnBoard(9,9) == true){
			throw new Error('isOnBoard error');
		}
	})
	
});