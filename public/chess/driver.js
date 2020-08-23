import Board from './board.js';
import * as pieces from './piece.js';

class Game{

    constructor(){
        this.thisBoard = new Board();
        this.currentPlayer = 0;
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
//testing
//One global game as bubblegum
var g_game = new Game();


function doSomethingOnClick(id){
    //add code to check if it's the players turn (differentiate btwn clients)
    let row = id[0];
    let col = id[1];
    let square = document.getElementById(id);
    //TODO
    //STILL NEED TO ADD ABILITY TO TELL WHEN IT"S THE PLAYERS TURN.
    //HARD CODING 1 for now, so when testing in nodemon, it's always your turn
    if(1){
    //TODO
    //change the g_game.currentPlayer in if condition to the client's team. Ensures player can't pick opponent's pieces.
    if(g_game.thisBoard.getPiece(row, col) != null && g_game.thisBoard.getPiece(row, col).team == g_game.currentPlayer){
      console.log(row + " : " + col);
      if(square.style.borderColor == "white"){
        square.style.borderColor = null;
        square.style.borderWidth = null;
        let piece = g_game.thisBoard.getPiece(row, col);
        let moves = g_game.thisBoard.getPiece(row, col).calcMove();
        moves = g_game.thisBoard.validateMoves(piece, moves);
        //TODO
        //SUBSTITUTING MOVES WITH HARD CODED OPTIONS FOR PAWN position 6 1 based off board
        //tmp test since validatemoves is not implemented yet
        moves = [  [ 5, 1 ] , [ 4, 1 ] ];
        if(moves != null){
          for(var i = 0; i < moves.length; i++){
              let move = document.getElementById("" + moves[i][0] + moves[i][1]);
              move.style.borderColor = null;
              move.style.borderWidth = null;
          }
        }
      }else if(square.style.borderColor == "green"){
        runMove(square);
      }else if (!hasOrigin()){
        square.style.borderColor = "white";
        square.style.borderWidth = "medium";
        let piece = g_game.thisBoard.getPiece(row, col);
        let moves = g_game.thisBoard.getPiece(row, col).calcMove();
        //TODO
        //SUBSTITUTING MOVES WITH HARD CODED OPTIONS FOR PAWN position 6 1 based off board
        //tmp test since validatemoves is not implemented yet
        //moves = g_game.thisBoard.validateMoves(piece, moves);
        moves = [  [ 5, 1 ] , [ 4, 1 ] ];
        if(moves != null){
          for(var i = 0; i < moves.length; i++){
              let move = document.getElementById("" + moves[i][0] + moves[i][1]);
              move.style.borderColor = "green";
              move.style.borderWidth = "medium";
          }
        }
        console.log(moves);
      }
    }else if(square.style.borderColor == "green"){
      runMove(square);
    }else if(g_game.thisBoard.getPiece(row, col) == null){
      console.log("no piece on the square");
    }
  }else{
    console.log("not players turn")
  }

}

function hasOrigin(){
  for (var i = 0; i < 8; i++){
    for (var j = 0; j < 8; j++){
      let square = document.getElementById("" + i + j);
      if(square.style.borderColor == "white"){
        return true;
      }
    }
  }
  return false;
}

function runMove(target){
  let origin;
  for (var i = 0; i < 8; i++){
    for (var j = 0; j < 8; j++){
      let square = document.getElementById("" + i + j);
      if(square.style.borderColor == "white"){
        origin = [i, j];
        square.style.borderColor = null;
        square.style.borderWidth = null;
      }else if(square.style.borderColor == "green"){
        square.style.borderColor = null;
        square.style.borderWidth = null;
      }
    }
  }
  console.log(origin)
  let newSquare = target.id.split("");
  let piece = g_game.thisBoard.getPiece(origin[0], origin[1]);
  g_game.thisBoard.movePiece(origin[0], origin[1], parseInt(newSquare[0]), parseInt(newSquare[1]))
  updateBoard();
  if(g_game.currentPlayer){
    g_game.currentPlayer = 0;
  }else{
    g_game.currentPlayer = 1;
  }
}

/*
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
*/

function updateBoard(){
    //Make the data match the front end representation
    //IE update pieces to their correct location
    //Note if the initial configuration is changed, this should catch it.
    console.log("board updating")
    for (var i = 0; i < 8; i++){
      for (var j = 0; j < 8; j++){
        let square = document.getElementById("" + i + j);
        if(square == null){
          square.removeChild(square);
        }else{
          square.innerHTML = "";
        }

        if(g_game.thisBoard.board[i][j] != null){
          let imgElem = document.createElement("img");
          if(g_game.thisBoard.board[i][j].team){
            imgElem.src = "/chess/images/b_" + g_game.thisBoard.board[i][j].constructor.name +  ".png";
            console.log(imgElem.src);
          }else{
            imgElem.src = "/chess/images/w_" + g_game.thisBoard.board[i][j].constructor.name +  ".png";
            console.log(imgElem.src);
          }
          square.appendChild(imgElem);
        }else{
          square.innerHTML = '&nbsp';
        }
      }
    }
}

//Forced by JS to do this after board creation
function addListeners(){
    console.log("Adding Listeners");
    for(var row = 0; row < 8; row++){
        for(var col = 0; col < 8; col++){
            let id = "" + col + row;
            //console.log(document.getElementById(id))
            document.getElementById(id).addEventListener("click", function() { doSomethingOnClick(id) });
        }
    }
}

function buildTable(){
  //team 0 is white, team 1 is black
  console.log("Building Board");
  let isBlack = 1;
  var cont = document.getElementById("board");
  if(cont == null){
      throw "Error: No board found";
  }
  for (var i = 0; i < 8; i++){
    let row = document.createElement('div')
    row.className = "Row";
    for (var j = 0; j < 8; j++){
      let color;
      if(isBlack){
        color = 'gray';
        isBlack = 0;
      }else{
        color = '#800000';
        isBlack = 1;
      }
      let cell = document.createElement('div');
      cell.className = "Cell";
      cell.id =  "" + i + j;
      cell.style.backgroundColor = color;
      row.appendChild(cell);
    }
    if(isBlack){
      isBlack = 0;
    }else{
      isBlack = 1;
    }
    cont.appendChild(row);
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
    updateBoard();
    addListeners();
    //document.getElementById("60").innerHTML += '<img src="/chess/images/pawn.png">';
}
