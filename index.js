var prompt = require('prompt');

/* 
Expected features
===============
* Minimal UI that redraws the board and makes clear whose turn it is, each turn.
* Players can submit moves (assume, admittedly unrealistically, that both players are sitting at the same keyboard).
* Win detection - detect and display who won
*/
var board = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]];
var movesAvail = 9;

var startSchema = {
  properties: {
    choice: {
      message: 'X or O?',
      required: true,
    }
  }
};

var roundStartSchema = {
  properties: {
    coords: {
      message: 'X and Y coordinates (separated by space)?',
      required: true,
    }
  }
};

function startGame () {
  prompt.start();
  prompt.get(startSchema, function (err, result) {
    var {choice} = result;
    choice = choice.toUpperCase();
    console.log('Choice is', choice);
    console.log('LETS GET STARTED!!!');
    
    startRound(choice, board);
  });    
}

function startRound (choice, board) {
  // showBoard(board)
  showBoard(board);
  prompt.get(roundStartSchema, function (err, result) {
    var {coords} = result;
    coords = coords.split(' ');
    var x = coords[0].toUpperCase();
    var y = coords[1].toUpperCase();

    board[x][y] = choice;
    movesAvail--;
    // After placing a piece
    showBoard(board);
    if (isWin(board, choice)) {
      console.log('WINNER!', choice, 'wins!');
      // announceWinner();
    } else if (!isSpaceAvail(board) || movesAvail) {
      console.log('No winner! Play again!');
      // endGame();
    } else {
      choice = changePiece(choice);
      startRound(choice, board);
    }
    
  });  
}

function isWin (board, choice) {
  // check rows, 
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    var numRowChoices = 0;
    for (var j = 0; j < board.length; j++) {
      var slot = row[j];
      if (slot === choice) {
        numRowChoices++;
      }
    }

    if (numRowChoices === 3) {
      return true;
    }

    if (row[i] === choice && row[i] === choice && row[i] === choice) {
      return true;
    }
  }

  if (board[0][0] === choice && board[1][1] === choice && board[2][2] === choice) {
    return true;
  }

  if (board[2][0] === choice && board[1][1] === choice && board[0][2] === choice) {
    return true;
  }


  return false;
  //check columns, 
  
  // check diagonals

}

function showBoard (board) {
  console.log('Composing board...');
  var stringInArray = board.map(row => {
    var rowWithDots = row.map(slot => {
      if (slot === undefined) {
        return '| . |';
      } else if (slot === 'X') {
        return '| X |';
      } else if (slot === 'O') {
        return '| O |';
      }
    });

    return rowWithDots.join('');
  });
  
  console.log(stringInArray.join('\n'));
  // return stringInArray.join('\n');
}

function switchPiece (piece) {
  if (piece === 'X') {
    return 'O';
  } else {
    return 'X';
  }
}

// HELPERS
      // isInBounds(x, y);
      // switchPiece();
  
    // optimizations later
      // only check for win after 3 X's or 3 O's have been placed down
      // regex for x or o!
      // check if in bounds
  
    // additional features
      // play again feature added at the very end\

startGame();
