import Board from './board.js';
import * as pieces from './piece.js';

class Game{

    constructor(){
        this.thisBoard = new Board();
        console.log(this.thisBoard.board);
    }

    start(){
        this.currentPlayer = 0;
    }

    endTurn(){
        if(this.currentPlayer == 0){

        }
    }

}

//One global game as bubblegum
var g_game = new Game();


function doSomethingOnClick(id){
    //split the id
    //row and col at our disposal
    //
    let row = id[0];
    let col = id[1];
    console.log(row + " : " + col);

    g_game.thisBoard.getPiece(row, col);

}

function buildTable(){
    console.log("Building Board");
    var cont = document.getElementById("boardContainer");
    if(cont == null){
        throw "Error: No board container found";
    }
    
    var alternator = false;

    for(var row = 0; row < 8; row++){
        for(var col = 0; col < 8; col++){
            addSquare(alternator, row, col);
            alternator = !alternator;
        }
        cont.innerHTML += "<br>";
        alternator = !alternator;
    }

    function addSquare(isBlackSquare, row, col){
        //New square append it to the board container
        var squareElem = document.createElement("span");
        cont.appendChild(squareElem);

        squareElem.id = "" + row + col;

        if(isBlackSquare){
            let imgElem = document.createElement("img");
            imgElem.src = "/chess/images/blacksquare.png";
            squareElem.appendChild(imgElem);
        }
        else{
            let imgElem = document.createElement("img");
            imgElem.src = "/chess/images/redsquare.png";
            squareElem.appendChild(imgElem);
        }
    }

}

//Forced by JS to do this after board creation
function addListeners(){
    console.log("Adding Listeners");
    for(var row = 0; row < 8; row++){
        for(var col = 0; col < 8; col++){
            let id = "" + col + row;
            document.getElementById(id).addEventListener("click", function() { doSomethingOnClick(id) });
        }
    }
}


/*
var game = new Game();
var piece = game.thisBoard.getPiece(1,0);
//Proves out move logic for right
var moves = [ [1,2] , [1,3] , [1,5] ];
var validMoves = game.thisBoard.validateMoves(piece, moves);
console.log(validMoves);
*/

//console.log(document.getElementById("00"));

window.onload = function(){
    buildTable();
    addListeners();
    //document.getElementById("60").innerHTML += '<img src="/chess/images/pawn.png">';
}