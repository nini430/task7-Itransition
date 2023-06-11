const checkGame = (board: any) => {
  console.log(board);
  if (board[0].every((move: string) => move === 'X')) {
    return 'X';
  }
  if (board[0].every((move: string) => move === 'O')) {
    return 'O';
  }
  if (board[1].every((move: string) => move === 'X')) {
    return 'X';
  }
  if (board[1].every((move: string) => move === 'O')) {
    return 'O';
  }
  if (board[2].every((move: string) => move === 'X')) {
    return 'X';
  }
  if (board[2].every((move: string) => move === 'O')) {
    return 'O';
  }

  if (board[0][0] == 'X' && board[1][0] === 'X' && board[2][0] === 'X') {
    return 'X';
  }
  if (board[0][0] == 'O' && board[1][0] === 'O' && board[2][0] === '0') {
    return 'O';
  }
  if (board[0][1] == 'X' && board[1][1] === 'X' && board[2][1] === 'X') {
    return 'X';
  }
  if (board[0][1] == 'O' && board[1][1] === 'O' && board[2][1] === 'O') {
    return 'O';
  }
  if (board[0][2] == 'X' && board[1][2] === 'X' && board[2][2] === 'X') {
    return 'X';
  }
  if (board[0][2] == 'O' && board[1][2] === 'O' && board[2][2] === 'O') {
    return 'O';
  }

  if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') {
    return 'X';
  }
  if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === '0') {
    return 'O';
  }

  if (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X') {
    return 'X';
  }
  if (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O') {
    return 'O';
  }

  let empty;

  board.forEach((row: any) => {
    row.forEach((col: any) => {
      if (col === '') {
        empty = true;
        return;
      }
    });
  });

  if (empty) {
    return 'continue';
  } else {
    return 'draw';
  }
};

export default checkGame;
