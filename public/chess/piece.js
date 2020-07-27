
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
        var possibleMoves = []
        console.log("Bishop Move Calc");
        //Return array of tuples with possible coordinates
        for (var i = 0; i < 8; i++){
            possibleMoves.push( [this.currentX + i, this.currentY + i] );
            possibleMoves.push( [this.currentY - i, this.currentY - i] );
            possibleMoves.push( [this.currentX + i, this.currentY - i] );
            possibleMoves.push( [this.currentX - i, this.currentY + i] );
        }
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
    }
}

export class Queen extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("Queen Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class King extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("King Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class Knight extends Piece{
    constructor(initX, initY, team){
        super(initX, initY, team);
    }

    calcMove(){
        console.log("Knight Move Calc");
        //Return array of tuples with possible coordinates
    }
}

