// @flow


import * as pieces from './piece.js';

//const pieces = require('./piece.js');

//Board has 8x8 matrix, JS is untyped can't force them to be pieces

export class Board{
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

        var pieceHold = this.getPiece(pieceRow, pieceCol); //this.board.getPiece(pieceRow, pieceCol);
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
        var validPieceMoves = this.validateMoves(piece, pieceMoves)

        //If a move intersects King position then check
        for(var i = 0; i < validPieceMoves.length; i++){
            if(kingPos == validPieceMoves[i]){
                return true;
            }
        }

        return false;
    }

    inCheckMate(king){

        var kingMoves = king.calcMove(); //calc King's possible moves
        var validKingMoves = this.validateMoves(king, kingMoves);
        var numMoves = validKingMoves.length;
        var checkMoves = 0; //Number of moves that result in check

        //loop through active pieces, if it's on the opposite team and its moves intersect with king's possible moves, register as check
        for(var i = 0; i < this.activePieces.length; i++){
            if(this.activePieces[i].team != king.team){
                for(var j = 0; j < validKingMoves.length; j++){
                    var checkBool = this.inCheck(this.activePieces[i], validKingMoves[j])
                    if(checkBool == true){
                        checkMoves++;
                        validKingMoves.splice(j,1); //if registered as check, remove from list in order to prevent duplicates
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
        var validMoves = [];

        if (piece.getPieceType() == "Knight"){
            for (var i = 0; i < moves.length; i++) {
                if (this.getPiece(moves[i][0], moves[i][1]) == null || this.getPiece(moves[i][0], moves[i][1]).team != piece.team){
                    validMoves.push(moves[i]);
                }
            }
            return validMoves;
        }

        for(var i = 0; i < moves.length; i++){

            //Get each move from the list
            var move = moves[i];

            //We are valid to start, will perform tests to invalidate
            var valid = true;

            //Cut down on operations by guessing the movement
            //Same Row?
            if(piece.currentRow == move[0]){
                //Must pass the check
                if(!horizontalCheck(this, piece, move)){
                    valid = false;
                }

            }
            //Same Column?
            else if(move[1] == piece.currentCol){
                //Must pass the check
                if(!verticalCheck(this, piece, move)){
                    valid = false;
                }
            }
            //Diagonal check from coords https://math.stackexchange.com/questions/1194565/how-to-know-if-two-points-are-diagonally-aligned
            else if( Math.abs(piece.currentRow - move[0]) == Math.abs(piece.currentCol - move[1]) ){
                if(!diagonalCheck(this, piece, move)){
                    valid = false;
                }
            }

            //Did we make it past the tests? If so it is a valid move
            if(valid){
                validMoves.push(move);
            }
            //



        }

        return validMoves;
    }


    //Helpers (Duct Tape)


}

export function newRow(row, rowCount, team){
    row.push(new pieces.Rook(rowCount,0,team));
    row.push(new pieces.Knight(rowCount,1,team));
    row.push(new pieces.Bishop(rowCount,2,team));
    row.push(new pieces.Queen(rowCount,3,team));
    row.push(new pieces.King(rowCount,4,team));
    row.push(new pieces.Bishop(rowCount,5,team));
    row.push(new pieces.Knight(rowCount,6,team));
    row.push(new pieces.Rook(rowCount,7,team));
}

export function pawnRow(row, rowCount, team){
    for(var j = 0; j < 8; j++){
        //fix hard code line here so that pawns are not all white team.
        var piece = new pieces.Pawn(rowCount,j, team);
        row.push(piece);
    }
}


//Obstruction tests

export function diagonalCheck(board, piece, move){
    var iterCount = Math.abs(piece.currentRow - move[0]);
    var iterator;

    //Down?
    if(move[0] > piece.currentRow){
        //Right or Left?
        if(move[1] > piece.currentCol){

            //Down and Right
            //Start from one for offset when checking
            for(iterator = 1; iterator <= iterCount; iterator++){
                //Do we hit another piece?
                if(board.getPiece(piece.currentRow + iterator, piece.currentCol + iterator) != null){
                    var otherPiece = board.getPiece(piece.currentRow + iterator, piece.currentCol + iterator);
                    //Are they the same team, therefore blocked?
                    if(otherPiece.team == piece.team){
                        return false;
                    }
                }
            }

        }
        else{

            //Down and Left
            //Start from one for offset when checking
            for(iterator = 1; iterator <= iterCount; iterator++){
                //Do we hit another piece?
                if(board.getPiece(piece.currentRow + iterator, piece.currentCol - iterator) != null){
                    var otherPiece = board.getPiece(piece.currentRow + iterator, piece.currentCol - iterator);
                    //Are they the same team, therefore blocked?
                    if(otherPiece.team == piece.team){
                        return false;
                    }
                }
            }

        }
    }
    //Else we are up
    else{

        //Right or Left?
        if(move[1] > piece.currentCol){

            //Up and Right
            //Start from one for offset when checking
            for(iterator = 1; iterator <= iterCount; iterator++){
                //Do we hit another piece?
                if(board.getPiece(piece.currentRow - iterator, piece.currentCol + iterator) != null){
                    var otherPiece = board.getPiece(piece.currentRow - iterator, piece.currentCol + iterator);
                    //Are they the same team, therefore blocked?
                    if(otherPiece.team == piece.team){
                        return false;
                    }
                }
            }

        }
        else{

            //Up and Left
            //Start from one for offset when checking
            for(iterator = 1; iterator <= iterCount; iterator++){
                //Do we hit another piece?
                if(board.getPiece(piece.currentRow - iterator, piece.currentCol - iterator) != null){
                    var otherPiece = board.getPiece(piece.currentRow - iterator, piece.currentCol - iterator);
                    //Are they the same team, therefore blocked?
                    if(otherPiece.team == piece.team){
                        return false;
                    }
                }
            }

        }

    }

    //Move checks out
    return true;

}

export function horizontalCheck(board, piece, move){
    var colIter;

    //Is the move to the right?
    if(move[1] > piece.currentCol){

        //Iterate to the right starting one move to the right
        for(colIter = (piece.currentCol + 1);  colIter <= move[1];  colIter++){
            //Do we hit another piece?
            if(board.getPiece(piece.currentRow, colIter) != null){
                var otherPiece = board.getPiece(piece.currentRow, colIter);
                //Are they the same team, therefore blocked?
                if(otherPiece.team == piece.team){
                    return false;
                }
            }
        }

    }
    //Else it is to the left
    else{

        //Iterate to the left starting one move to the left
        for(colIter = (piece.currentCol - 1); colIter >= move[1]; colIter--){
            //Do we hit another piece?
            if(board.getPiece(piece.currentRow, colIter) != null){
                var otherPiece = board.getPiece(piece.currentRow, colIter);
                //Are they the same team, therefore blocked?
                if(otherPiece.team == piece.team){
                    return false;
                }
            }
        }
    }

    //Move checks out
    return true;
}

export function verticalCheck(board, piece, move){
    var rowIter;

    // Vertical is top down from 0 - 7

    //Is the move down?
    if(move[0] > piece.currentRow){

        //Iterate down starting one move down
        for(rowIter = (piece.currentRow + 1);  rowIter <= move[0];  rowIter++){
            //Do we hit another piece?
            if(board.getPiece(rowIter, piece.currentCol) != null){
                var otherPiece = board.getPiece(rowIter, piece.currentCol);
                //Are they the same team, therefore blocked?
                if(otherPiece.team == piece.team){
                    return false;
                }
            }
        }

    }
    //Else it is up
    else{

        //Iterate up starting one move up
        for(rowIter = (piece.currentRow - 1); rowIter >= move[0]; rowIter--){
            //Do we hit another piece?
            if(board.getPiece(rowIter, piece.currentCol) != null){
                var otherPiece = board.getPiece(rowIter, piece.currentCol);
                //Are they the same team, therefore blocked?
                if(otherPiece.team == piece.team){
                    return false;
                }
            }
        }
    }

    //Move checks out
    return true;
}

/*exports.Board = Board;
exports.newRow = newRow;
exports.pawnRow = pawnRow;
exports.diagonalCheck = diagonalCheck;
exports.horizontalCheck = horizontalCheck;
exports.verticalCheck = verticalCheck;*/

//I'm thinking we don't need tests for each individual, just check available coordinates and check move validity
function obstructionCheck(row, col, targetRow, targetCol){

}
