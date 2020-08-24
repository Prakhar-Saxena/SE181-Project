import * as Functions from "../public/chess/board";
import * as Pieces from "../public/chess/piece";


describe('piece', () => {
    it("filterMoves: should filter any negative and more than indexed 7 values", () => {
        var piece = new Pieces.Piece(0, 0, 0);
        var moves = [];
        moves = piece.filterMoves([[3,4], [-3,4], [9,6], [4, 5], [19,-6]]);
        for( var i = 0; i < moves.length; i++ ){
            if (moves[i][0] < 0 || moves[i][1] < 0 || moves[i][0] > 7 || moves[i][1] > 7)
            throw new Error(`valid moves contains out of bounds index`);
        }
    })
    it("Pawn calcMove: should return valid moves", () => {
        var piece = new Pieces.Pawn(1, 0, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 2 )
        throw new Error(`Pawn calcMove doesn't return the 2 moves from row`)
    })
    it("Bishop calcMoves: should return valid moves", () => {
        var piece = new Pieces.Bishop(0, 0, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 7 )
        throw new Error(`Bishop calcMove doesn't return the 7 moves diagonally`)
    })
    it("Rook calcMoves: should return valid moves", () => {
        var piece = new Pieces.Rook(0, 0, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 14 )
        throw new Error(`Rook calcMove doesn't return the 14 moves upwards and sidewards`)
    })
    it("Queen calcMoves: should return valid moves", () => {
        var piece = new Pieces.Queen(0, 0, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 21 )
        throw new Error(`Queen calcMove doesn't return the 21 moves upwards and sidewards`)
    })
    it("King calcMoves: should return valid moves", () => {
        var piece = new Pieces.King(4, 4, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 8 )
        throw new Error(`King calcMove doesn't return the 8 moves upwards and sidewards`)
    })
    it("Knight calcMoves: should return valid moves", () => {
        var piece = new Pieces.Knight(4, 4, 0);
        var moves = [];
        moves = piece.calcMove();
        console.log(moves);
        if (moves.length != 8 )
        throw new Error(`Knight calcMove doesn't return the 8 moves upwards and sidewards`)
    })
});