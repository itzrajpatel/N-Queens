export default function solvePuzzle(board) {
  const N = board.length;
  const results = [];
  const animationsList = [];

  function deepCopy(board) {
    return JSON.parse(JSON.stringify(board));
  }

  function saveAnimation(board, i, j, animations) {
    const temp = deepCopy(board);
    temp[i][j].isActive = true;
    animations.push(temp);
  }

  function isSafe(row, col) {
    for (let i = 0; i < col; i++) if (board[row][i].hasQueen) return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j].hasQueen) return false;
    for (let i = row + 1, j = col - 1; j >= 0 && i < N; i++, j--)
      if (board[i][j].hasQueen) return false;
    return true;
  }

  function placeQueen(col, animations) {
    if (col >= N) {
      results.push(deepCopy(board));
      animationsList.push([...animations, deepCopy(board)]);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (isSafe(i, col)) {
        saveAnimation(board, i, col, animations);
        board[i][col].hasQueen = true;
        saveAnimation(board, i, col, animations);

        placeQueen(col + 1, [...animations]);

        board[i][col].hasQueen = false;
      }
    }
  }

  placeQueen(0, []);
  return { results, animationsList };
}
