

import { Board } from './board.js';
import * as pieces from './piece.js';

class Game{

    constructor(){
        this.thisBoard = new Board();
        this.currentPlayer = 1;
        this.isGameDone = false;
        console.log(this.thisBoard.board);
    }

    start(){
        this.currentPlayer = 1;
    }

    endTurn(){
        if(this.currentPlayer == 0){

        }
    }

}
//testing
var g_game = new Game();


function doSomethingOnClick(id){
    //add code to check if it's the players turn (differentiate btwn clients)
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);
    let square = document.getElementById(id);
    //TODO
    //STILL NEED TO ADD ABILITY TO TELL WHEN IT"S THE PLAYERS TURN.
    //HARD CODING 1 for now, so when testing in nodemon, it's always your turn
    if(1 && !g_game.isGameDone){
    //TODO
    //change the g_game.currentPlayer in if condition to the client's team. Ensures player can't pick opponent's pieces.
    if(g_game.thisBoard.getPiece(row, col) != null && g_game.thisBoard.getPiece(row, col).team == g_game.currentPlayer){
      if(square.style.borderColor == "white"){
        square.style.borderColor = null;
        square.style.borderWidth = null;
        let piece = g_game.thisBoard.getPiece(row, col);
        let moves = g_game.thisBoard.getPiece(row, col).calcMove();
        moves = g_game.thisBoard.validateMoves(piece, moves);
        if(piece.getPieceType() == "Pawn"){
          if(piece.team == 1){
            for (var i = 0; i < moves.length; i++) {
                if (moves[i][0] == (row - 1) && moves[i][1] == col && g_game.thisBoard.getPiece(row - 1, col) != null){
                    moves.splice(i,1);
                }
            }
              if(g_game.thisBoard.isOnBoard(row - 1, col - 1) && g_game.thisBoard.getPiece(row - 1, col - 1) != null && g_game.thisBoard.getPiece(row - 1, col - 1).team != piece.team){
                moves.push([row - 1, col - 1]);
              }
              if(g_game.thisBoard.isOnBoard(row - 1, col + 1) && g_game.thisBoard.getPiece(row - 1, col + 1) != null && g_game.thisBoard.getPiece(row - 1, col + 1).team != piece.team){
                moves.push([row - 1, col + 1]);
              }
          }
          else{
            for (var i = 0; i < moves.length; i++) {
                if (moves[i][0] == (row + 1) && moves[i][1] == col && g_game.thisBoard.getPiece(row + 1, col) != null){
                    moves.splice(i,1);
                }
            }
            if(g_game.thisBoard.isOnBoard(row + 1, col - 1) && g_game.thisBoard.getPiece(row + 1, col - 1) != null && g_game.thisBoard.getPiece(row + 1, col - 1).team != piece.team){
              moves.push([row + 1, col - 1]);
            }
            if(g_game.thisBoard.isOnBoard(row + 1, col + 1) && g_game.thisBoard.getPiece(row + 1, col + 1) != null && g_game.thisBoard.getPiece(row + 1, col + 1).team != piece.team){
              moves.push([row + 1, col + 1]);
            }
          }
        }

        if(moves != null && moves.length > 0){
          for(var i = 0; i < moves.length; i++){
              let move = document.getElementById("" + moves[i][0] + moves[i][1]);
              move.style.borderColor = null;
              move.style.borderWidth = null;
          }
        }
      }else if(square.style.borderColor == "green"){
        let newSquare = square.id.split("");
        runMove(square);
        let checkPiece = g_game.thisBoard.getPiece(parseInt(newSquare[0]), parseInt(newSquare[1]));
        checkGameStatus(checkPiece);
      }else if (!hasOrigin()){
        console.log("testing")
        square.style.borderColor = "white";
        square.style.borderWidth = "medium";
        let piece = g_game.thisBoard.getPiece(row, col);
        let moves = g_game.thisBoard.getPiece(row, col).calcMove();
        console.log(piece);
        moves = g_game.thisBoard.validateMoves(piece, moves);
        if(piece.getPieceType() == "Pawn"){
          if(piece.team == 1){
            for (var i = 0; i < moves.length; i++) {
                if (moves[i][0] == (row - 1) && moves[i][1] == col && g_game.thisBoard.getPiece(row - 1, col) != null){
                    moves.splice(i,1);
                }
            }
              if(g_game.thisBoard.isOnBoard(row - 1, col - 1) && g_game.thisBoard.getPiece(row - 1, col - 1) != null && g_game.thisBoard.getPiece(row - 1, col - 1).team != piece.team){
                moves.push([row - 1, col - 1]);
              }
              if(g_game.thisBoard.isOnBoard(row - 1, col + 1) && g_game.thisBoard.getPiece(row - 1, col + 1) != null && g_game.thisBoard.getPiece(row - 1, col + 1).team != piece.team){
                moves.push([row - 1, col + 1]);
              }
          }
          else{
            for (var i = 0; i < moves.length; i++) {
                if (moves[i][0] == (row + 1) && moves[i][1] == col && g_game.thisBoard.getPiece(row + 1, col) != null){
                    moves.splice(i,1);
                }
            }
            if(g_game.thisBoard.isOnBoard(row + 1, col - 1) && g_game.thisBoard.getPiece(row + 1, col - 1) != null && g_game.thisBoard.getPiece(row + 1, col - 1).team != piece.team){
              moves.push([row + 1, col - 1]);
            }
            if(g_game.thisBoard.isOnBoard(row + 1, col + 1) && g_game.thisBoard.getPiece(row + 1, col + 1) != null && g_game.thisBoard.getPiece(row + 1, col + 1).team != piece.team){
              moves.push([row + 1, col + 1]);
            }
          }
        }

        if(moves != null && moves.length > 0){
          for(var i = 0; i < moves.length; i++){
              let move = document.getElementById("" + moves[i][0] + moves[i][1]);
              move.style.borderColor = "green";
              move.style.borderWidth = "medium";
          }
        }
      }
    }else if(square.style.borderColor == "green"){
      let newSquare = square.id.split("");
      runMove(square);
      let checkPiece = g_game.thisBoard.getPiece(parseInt(newSquare[0]), parseInt(newSquare[1]));
      checkGameStatus(checkPiece);
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

function checkGameStatus(checkPiece){
  console.log(checkPiece)
  console.log("STATUS BEFORE " + g_game.thisBoard.checkMateStatus)
  for (var i = 0; i < 8; i++){
    for (var j = 0; j < 8; j++){
      let piece = g_game.thisBoard.getPiece(i, j);
      if(piece != null && piece.getPieceType() == "King" && piece.team == g_game.currentPlayer){
        if(g_game.thisBoard.inCheck(checkPiece, [i,j])){
          alert('check');
          g_game.thisBoard.inCheckMate(piece);
          console.log("STATUS VAL " + g_game.thisBoard.checkMateStatus)
          if(g_game.thisBoard.checkMateStatus){
            console.log("Game Over")
            g_game.isGameDone = true;
            alert('checkmate');
          }
        }
        break;
      }
    }
  }
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
  let newSquare = target.id.split("");
  let piece = g_game.thisBoard.getPiece(origin[0], origin[1]);
  piece.currentRow = parseInt(newSquare[0]);
  piece.currentCol = parseInt(newSquare[1]);
  piece.locationMap.push([parseInt(newSquare[0]),parseInt(newSquare[0])]);
  piece.id =  piece.team.toString() + parseInt(newSquare[0]) + parseInt(newSquare[1]);
  g_game.thisBoard.movePiece(origin[0], origin[1], parseInt(newSquare[0]), parseInt(newSquare[1]))
  updateBoard();
  if(g_game.currentPlayer){
    g_game.currentPlayer = 0;
  }else{
    g_game.currentPlayer = 1;
  }
}


function updateBoard(){
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

window.onload = function(){
    buildTable();
    updateBoard();
    addListeners();
    //document.getElementById("60").innerHTML += '<img src="/chess/images/pawn.png">';
}

/*
var game = new Game();
var piece = game.thisBoard.getPiece(1,4);
//Proves out move logic for right
var moves = [ [0,5] , [0,3] , [2,3] , [2,5]];
var validMoves = game.thisBoard.validateMoves(piece, moves);
console.log("Valid Moves : " + validMoves);
*/
