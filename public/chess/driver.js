import Board from './board.js';
import * as pieces from './piece.js';

var newBoard = new Board();
console.log(newBoard.board);
console.log(newBoard.board[0][1].constructor.name);
console.log(newBoard.board[0][1].team)
console.log(newBoard.board[3][0] == null);
var pawn = newBoard.getPiece(1,0);
console.log( pawn.calcMove() );

/*
<style type="text/css">
	img
	{
		width: 100%;
    height: 100%;
	}
	.board
    {
    	height: 500px;
      width: 500px;
    }
    .Row
    {
        display: flex;
        height: 12.5%;
    }
    .Cell
    {
        flex: 1;
        border: solid;
        border-width: thin;
        width: 12.5%;
        height: 100%

    }
</style>
*/

function makeBoard(){
  //team 0 is white, team 1 is black
  /*let pieces = {
    w_King : '&#9812', w_Queen : '&#9813', w_Rook: '&#9814', w_Bishop : '&#9815', w_Knight: '&#9816', w_Pawn: '&#9817',
    b_King: '&#9818', b_Queen: '&#9819', b_Rook: '&#9820', b_Bishop: '&#9821', b_Knight: '&#9822', b_Pawn: '&#9823'
  }*/
  let isBlack = 1;
  let html = '';
  for (var i = 0; i < 8; i++){
    html += '<div class="Row">';
    for (var j = 0; j < 8; j++){
      let color;
      if(isBlack){
        color = 'black';
        isBlack = 0;
      }else{
        color = '#800000';
        isBlack = 1;
      }
      html += '<div class="Cell"' + 'style=background-color:' + color + ' >';
      if(newBoard.board[i][j] != null){
        if(newBoard.board[i][j].team){
            //html += pieces['b_'+newBoard.board[i][j].constructor.name];
            html += '<img src="b_' + newBoard.board[i][j].constructor.name +  '.png" alt=' + newBoard.board[i][j].constructor.name + '>';
        }else{
          //html += pieces['w_'+newBoard.board[i][j].constructor.name];
          html += '<img src="w_' + newBoard.board[i][j].constructor.name +  '.png" alt=' + newBoard.board[i][j].constructor.name + '>';
        }
      }else{
        html += '&nbsp';
      }
      html += '</div>'
    }
    if(isBlack){
      isBlack = 0;
    }else{
      isBlack = 1;
    }
    html += '</div>'
  }
  return html;
}


console.log(makeBoard());
