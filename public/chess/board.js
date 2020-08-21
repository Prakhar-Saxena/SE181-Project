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

    isCheckMate(){
        //return a boolean if the current board state is a checkmate condition, maybe return not a boolean maybe the team that is victorious and -1 for no win
        //idk, figure it out
    }

    validateMoves(piece, moves){
        var validMoves = [];

        for(var i = 0; i < moves.length; i++){

            //Get each move from the list
            var move = moves[i];

            //We are valid to start, will perform tests to invalidate
            var valid = true;

            //Same Row?
            if(piece.currentRow == move[0]){

                //Column Iterator
                var colIter;

                //Is the move to the right?
                if(move[1] > piece.currentCol){

                    //Iterate to the right starting one move ahead
                    for(colIter = (piece.currentCol + 1);  colIter <= move[1];  colIter++){
                        //Do we hit another piece?
                        if(this.getPiece(piece.currentRow, colIter) != null){
                            var otherPiece = this.getPiece(piece.currentRow, colIter);
                            //Are they the same team, therefore blocked?
                            if(otherPiece.team == piece.team){
                                valid = false;
                            }
                        }
                    }
                }
                //Else it is to the left
                else{
                    console.log("Left check under construction");
                }
            }
            //Same Column?
            else if(move[1] == piece.currentCol){
                console.log("Same column borked");
                break;
            }

            //Did we make it past the tests? If so it is a valid move
            if(valid){
                validMoves.push(move);
            }
            //



        }

        return validMoves;
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
        //fix hard code line here so that pawns are not all white team.
        var piece = new pieces.Pawn(rowCount,j, team);
        row.push(piece);
    }
}


//Obstruction tests
function diagonalCheck(row, col, targetRow, targetCol){

}

function horizontalCheck(row, col, targetRow, targetCol){

}

function verticalCheck(row, col, targetRow, targetCol){

}
