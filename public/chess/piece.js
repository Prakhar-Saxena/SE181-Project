class Piece{
    constructor(id){
        this.id = id;
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
    }
}

export class Bishop extends Piece{
    constructor(id){
        super(id);
    }

    calcMove(currentX, currentY){
        console.log("Thats right bitch");
        //Return array of tuples with possible coordinates
    }
}


