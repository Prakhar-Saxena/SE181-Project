
/* Implement helper functions for move calculation
* Sample: calcForwardMovement(distance) <- usable by Queen Pawn King Rook
*
*/

export class Piece{
    constructor(initRow, initCol, team){
        this.id =  team.toString() + initRow + initCol;
        this.locationMap = [(initRow,initCol)];
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

        return possibleMoves;
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
        console.log("Bishop Move Calc");
        //Return array of tuples with possible coordinates
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
    }
}

export class Queen extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("Queen Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class King extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("King Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class Knight extends Piece{
    constructor(initRow, initCol, team){
        super(initRow, initCol, team);
    }

    calcMove(){
        console.log("Knight Move Calc");
        //Return array of tuples with possible coordinates
    }
}

