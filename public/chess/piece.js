
/* Implement helper functions for move calculation
* Sample: calcForwardMovement(distance) <- usable by Queen Pawn King Rook
*
*/


class Piece{
    constructor(id, initX, initY){
        this.id = id;
        this.locationMap = [(initX,initY)];
    }

    calcMove(currentX, currentY){
        console.log("Wrong use dummy");
    }
}

export class Pawn extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Pawn stuff");
        //Return array of tuples with possible coordinates

        //is First move and can slide two spaces
        if(this.locationMap.length == 1){
            //First move logic
        }

    }
}

export class Bishop extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Bishop Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class Rook extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Rook Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class Queen extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Queen Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class King extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("King Move Calc");
        //Return array of tuples with possible coordinates
    }
}

export class Knight extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Knight Move Calc");
        //Return array of tuples with possible coordinates
    }
}

