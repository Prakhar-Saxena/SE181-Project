import * as pieces from './piece.js';

//Board has 8x8 matrix, JS is untyped can't force them to be pieces

export default class Board{
    constructor(){
        this.board = this.initializeBoard();
    }

    initializeBoard(){
        var toReturn = [[],[],[],[],[],[],[],[]];
        //Create an empty board
        for(var i = 0; i < 8; i++){

            switch(i){
                case 0:
                    newRow(toReturn[i], i, 0);
                    break;

                case 1:
                    pawnRow(toReturn[i], i, 0);
                    break;

                case 6:
                    pawnRow(toReturn[i], i, 1);
                    break;

                case 7:
                    newRow(toReturn[i], i, 1);
                    break;

                default:
                    toReturn[i] = [null, null, null, null, null, null, null, null];
            }

        }
        return toReturn;
    }

    getPiece(row, col){
        var thisRow = this.board[row];
        return thisRow[col];
    }

}

function newRow(row, rowCount, team){
    row.push(new pieces.Rook(rowCount,0,team));
    row.push(new pieces.Knight(rowCount,1,team));
    row.push(new pieces.Bishop(rowCount,2,team));
    row.push(new pieces.Queen(rowCount,3,team));
    row.push(new pieces.King(rowCount,4,team));
    row.push(new pieces.Bishop(rowCount,5,team));
    row.push(new pieces.Knight(rowCount,6,team));
    row.push(new pieces.Rook(rowCount,7,team));
}

function pawnRow(row, rowCount, team){
    for(var j = 0; j < 8; j++){
        var piece = new pieces.Pawn(rowCount,j, 0); 
        row.push(piece); 
    }
}
