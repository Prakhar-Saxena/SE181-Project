
/* Implement helper functions for move calculation
* Sample: calcForwardMovement(distance) <- usable by Queen Pawn King Rook
*
*/


class Piece{
    constructor(initX, initY, team){
        this.id = initX.toString() + initY + team;
        this.locationMap = [(initX,initY)];
        this.team = team;
        this.currentX = initX;
        this.currentY = initY;
    }

    calcMove(){
        console.log("Wrong use dummy");
    }

    getPieceType(){
        return "None";
    }
}

export class Pawn extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        var possibleMoves = []
        console.log("Pawn stuff");

        //Return array of tuples with possible coordinates
        if(this.team == 1){
            possibleMoves.push( [this.currentX - 1, this.currentY] );
        }
        else{
            possibleMoves.push( [this.currentX + 1, this.currentY] );
        }

        //is First move and can slide two spaces
        if(this.locationMap.length == 1){
            if(this.team == 1){
                possibleMoves.push( [this.currentX - 2, this.currentY] );
            }
            else{
                possibleMoves.push( [this.currentX + 2, this.currentY] );
            }
        }

        return possibleMoves;
    }


    getPieceType(){
        return "Pawn";
    }
}

export class Bishop extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        var possibleMoves = [];
        console.log("Bishop Move Calc");
        //Return array of tuples with possible coordinates
        for (var i = 0; i < 8; i++){
            possibleMoves.push( [this.currentX + i, this.currentY + i] );
            possibleMoves.push( [this.currentY - i, this.currentY - i] );
            possibleMoves.push( [this.currentX + i, this.currentY - i] );
            possibleMoves.push( [this.currentX - i, this.currentY + i] );
        }
        return possibleMoves;
    }

    getPieceType(){
        return "Bishop";
    }
}

export class Rook extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("Rook Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        for (var i = 0; i < 8; i ++){
            possibleMoves.push( [i, this.currentY] );
            possibleMoves.push( [this.currentX, i] );
        }
        return possibleMoves;
    }
}

export class Queen extends Piece, Bishop, Rook{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("Queen Move Calc");
        //Return array of tuples with possible coordinates
        var tempBishop = new Bishop(this.currentX, this.currentY, this.team);
        var tempRook = new Rook(this.currentX, this.currentY, this.team);
        let possibleMovesBishop = tempBishop.calcMove();
        let possibleMovesRook = tempRook.calcMove();
        tempBishop = null;
        tempRook = null;
        let possibleMoves = possibleMovesBishop.concat(possibleMovesRook);
        return (possibleMoves.filter((item, i, ar) => ar.indexOf(item) === i));
    }
}

export class King extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("King Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        possibleMoves.push( [this.currentX      , this.currentY + 1 ] );
        possibleMoves.push( [this.currentX + 1  , this.currentY + 1 ] );
        possibleMoves.push( [this.currentX + 1  , this.currentY     ] );
        possibleMoves.push( [this.currentX + 1  , this.currentY - 1 ] );
        possibleMoves.push( [this.currentX      , this.currentY - 1 ] );
        possibleMoves.push( [this.currentX - 1  , this.currentY - 1 ] );
        possibleMoves.push( [this.currentX - 1  , this.currentY     ] );
        possibleMoves.push( [this.currentX - 1  , this.currentY + 1 ] );
        return possibleMoves;
    }
}

export class Knight extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("Knight Move Calc");
        //Return array of tuples with possible coordinates
        var possibleMoves = [];
        possibleMoves.push( [this.currentX - 1, this.currentY + 2] );
        possibleMoves.push( [this.currentX + 1, this.currentY + 2] );
        possibleMoves.push( [this.currentX + 2, this.currentY + 1] );
        possibleMoves.push( [this.currentX + 2, this.currentY - 1] );
        possibleMoves.push( [this.currentX + 1, this.currentY - 2] );
        possibleMoves.push( [this.currentX - 1, this.currentY - 2] );
        possibleMoves.push( [this.currentX - 2, this.currentY - 1] );
        possibleMoves.push( [this.currentX - 2, this.currentY + 1] );
        return possibleMoves;
    }
}

