//Board has 8x8 matrix, JS is untyped can't force them to be pieces

class Board{
    constructor(){
        this.board = this.initializeBoard();
    }

    initializeBoard(){
        toReturn = {};
        for(i = 0; i < 8; i++){
            toReturn[i] = {None, None, None, None, None, None, None, None};
        }
        return toReturn;
    }

}
