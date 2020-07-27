import * as pieces from './piece.js';

//Board has 8x8 matrix, JS is untyped can't force them to be pieces

export default class Board{
    constructor(){
        this.board = this.initializeBoard();
        this.activePieces = []; //List tracks pieces that are currently active on board
        this.checkMateStatus = false;
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

    movePiece(pieceRow, pieceCol, newRow, newCol){
        if(!this.isOnBoard(newRow, newCol)){
            console.log("Move outside of board");
            return;
        }

        var pieceHold = this.board.getPiece(pieceRow, pieceCol);
        this.board[pieceRow][pieceCol] = null;
        this.board[newRow][newCol] = pieceHold;

    }

    isOnBoard(row, col){
        if(row > 7 || col > 7 || row < 0 || col < 0)
            return false;
        return true;
    }



    inCheck(piece, kingPos){
     
        //Calc all available moves for piece
        var pieceMoves = piece.calcMove();

        //If a move intersects King position then check
        for(i = 0; i < pieceMoves.length; i++){
            if(kingPos == pieceMoves[i]){
                return true;
            }
        }

    }

    inCheckMate(king){
     
        var kingMoves = king.calcMove(); //calc King's possible moves
        numMoves = kingMoves.length;
        checkMoves = 0; //Number of moves that result in check

        //loop through active pieces, if it's on the opposite team and its moves intersect with king's possible moves, register as check
        for(i = 0; i < this.activePieces.length; i++){ 
            if(this.activePieces[i].team != king.team){
                for(j = 0; j < kingMoves.length; j++){
                    var checkBool = this.inCheck(this.activePieces[i], kingMoves[j])
                    if(checkBool == true){
                        checkMoves++;
                    }
                }
            }
        }

        //If all available moves result in check then checkmate
        if(checkMoves == numMoves){ 
            this.checkMateStatus = true;
        }

    }

    validateMoves(piece, moves){
                
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


//Obstruction tests
//I'm thinking we don't need tests for each individual, just check available coordinates and check move validity
function obstructionCheck(row, col, targetRow, targetCol){
 
}