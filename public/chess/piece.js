// @flow

/* Implement helper functions for move calculation
* Sample: calcForwardMovement(distance) <- usable by Queen Pawn King Rook
*
*/

export class Piece{
    constructor(initRow, initCol, team){
        this.id =  team.toString() + initRow + initCol;
        this.locationMap = [ [initRow,initCol] ];
        this.team = team;
        this.currentRow = initRow;
        this.currentCol = initCol;
    }

    calcMove(){
        console.log("Wrong use dummy");
    }

    getPieceType(){
        return "None";
    }

    filterMoves(moves){
        onBoardMoves = [];
        for(var i = 0; i < moves.length; i++){
            if (!(moves[i][0] < 0 || moves[i][1] < 0 || moves[i][0] > 7 || moves[i][1] > 7 )){
                onBoardMoves.push(moves[i]);
            }
        }
        return onBoardMoves;
    }

}

export class Pawn extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        var possibleMoves = []
        console.log("Pawn stuff");

        //Return array of tuples with possible coordinates
        if(this.team == 1){
            possibleMoves.push( [this.currentRow - 1, this.currentCol] );
        }
        else{
            possibleMoves.push( [this.currentRow + 1, this.currentCol] );
        }

        //is First move and can slide two spaces
        if(this.locationMap.length == 1){
            if(this.team == 1){
                possibleMoves.push( [this.currentRow - 2, this.currentCol] );
            }
            else{
                possibleMoves.push( [this.currentRow + 2, this.currentCol] );
            }
        }

        return filterMoves(possibleMoves);
    }


    getPieceType(){
        return "Pawn";
    }
}

export class Bishop extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        var possibleMoves = [];
        console.log("Bishop Move Calc");
        //Return array of tuples with possible coordinates
        for (var i = 1; i < 8; i++){
            possibleMoves.push( [this.currentRow + i, this.currentCol + i] );
            possibleMoves.push( [this.currentCol - i, this.currentCol - i] );
            possibleMoves.push( [this.currentRow + i, this.currentCol - i] );
            possibleMoves.push( [this.currentRow - i, this.currentCol + i] );
        }
        return filterMoves(possibleMoves);
    }

    getPieceType(){
        return "Bishop";
    }
}

export class Rook extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("Rook Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        for (var i = 0; i < 8; i ++){
            if(i != this.currentRow)
                possibleMoves.push( [i, this.currentCol] );
            
            if(i != this.currentCol)
                possibleMoves.push( [this.currentRow, i] );
        }
        return filterMoves(possibleMoves);
    }
}

export class Queen extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("Queen Move Calc");
        //Return array of tuples with possible coordinates
        var tempBishop = new Bishop(this.currentRow, this.currentCol, this.team);
        var tempRook = new Rook(this.currentRow, this.currentCol, this.team);
        let possibleMovesBishop = tempBishop.calcMove();
        let possibleMovesRook = tempRook.calcMove();
        tempBishop = null;
        tempRook = null;
        let possibleMoves = possibleMovesBishop.concat(possibleMovesRook);
        return filterMoves((possibleMoves.filter((item, i, ar) => ar.indexOf(item) === i)));
    }
}

export class King extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("King Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        possibleMoves.push( [this.currentRow      , this.currentCol + 1 ] );
        possibleMoves.push( [this.currentRow + 1  , this.currentCol + 1 ] );
        possibleMoves.push( [this.currentRow + 1  , this.currentCol     ] );
        possibleMoves.push( [this.currentRow + 1  , this.currentCol - 1 ] );
        possibleMoves.push( [this.currentRow      , this.currentCol - 1 ] );
        possibleMoves.push( [this.currentRow - 1  , this.currentCol - 1 ] );
        possibleMoves.push( [this.currentRow - 1  , this.currentCol     ] );
        possibleMoves.push( [this.currentRow - 1  , this.currentCol + 1 ] );
        return filterMoves(possibleMoves);
    }
}

export class Knight extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("Knight Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        possibleMoves.push( [this.currentRow - 1, this.currentCol + 2] );
        possibleMoves.push( [this.currentRow + 1, this.currentCol + 2] );
        possibleMoves.push( [this.currentRow + 2, this.currentCol + 1] );
        possibleMoves.push( [this.currentRow + 2, this.currentCol - 1] );
        possibleMoves.push( [this.currentRow + 1, this.currentCol - 2] );
        possibleMoves.push( [this.currentRow - 1, this.currentCol - 2] );
        possibleMoves.push( [this.currentRow - 2, this.currentCol - 1] );
        possibleMoves.push( [this.currentRow - 2, this.currentCol + 1] );
        return filterMoves(ossibleMoves);
    }

    getPieceType(){
        return "Knight";
    }
}

/*exports.Piece = Piece;
exports.Pawn = Pawn;
exports.Bishop = Bishop;
exports.Rook = Rook;
exports.King = King;
exports.Queen = Queen;
exports.Knight = Knight;*/