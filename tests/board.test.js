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
	it("movePiece: Piece should be moved", () => {
		var board = new Board.Board();
		board.initializeBoard();
		board.movePiece(0,0,4,4);
		if(board.getPiece(4,4) == null){
			throw new Error('movePiece error');
		}
	})
	it("inCheck: king is in check", () => {
		var board = new Board.Board();
		var rookW = new Pieces.Rook(0,7,1);
		var kingB = new Pieces.King(0,6,0);
		var kingW = new Pieces.King(7,4,1);
		var pawn01B = new Pieces.Pawn(6,5,0);
		var pawn02B = new Pieces.Pawn(6,6,0);
		var pawn03B = new Pieces.Pawn(6,7,0);
		board.initializeBoard();
		var checkBool = board.inCheck(rookW, [0,6]);
		if(checkBool == false){
			throw new Error('inCheck error');
		}
	})
	
});