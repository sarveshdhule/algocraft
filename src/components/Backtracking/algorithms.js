// N-Queens: returns { solutions, steps }
export function solveNQueensWithSteps(n) {
  const steps = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  const solutions = [];
  function isValid(board, row, col) {
    for (let j = 0; j < n; j++) if (board[row][j] === 'Q') return false;
    for (let i = 0; i < n; i++) if (board[i][col] === 'Q') return false;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (board[i][j] === 'Q' && (i + j === row + col || i - j === row - col)) return false;
    return true;
  }
  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(row => [...row]));
      steps.push({
        type: 'solution',
        board: board.map(row => [...row]),
        message: `Found solution ${solutions.length}!`
      });
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(board, row, col)) {
        board[row][col] = 'Q';
        steps.push({
          type: 'place',
          row,
          col,
          board: board.map(row => [...row]),
          message: `Placing queen at row ${row}, col ${col}`
        });
        backtrack(row + 1);
        board[row][col] = '.';
        steps.push({
          type: 'backtrack',
          row,
          col,
          board: board.map(row => [...row]),
          message: `Backtracking: removing queen from row ${row}, col ${col}`
        });
      } else {
        steps.push({
          type: 'invalid',
          row,
          col,
          board: board.map(row => [...row]),
          message: `Invalid position: row ${row}, col ${col}`
        });
      }
    }
  }
  backtrack(0);
  return { solutions, steps };
}

// Word Search: returns { solutions, steps }
export function solveWordSearchWithSteps(board, word) {
  const steps = [];
  const rows = board.length;
  const cols = board[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const solutions = [];
  function backtrack(row, col, index, visited, path) {
    if (index === word.length) {
      solutions.push([...path]);
      steps.push({ type: 'solution', path: [...path], message: `Found word "${word}"!` });
      return true;
    }
    if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || board[row][col] !== word[index]) return false;
    visited[row][col] = true;
    path.push([row, col]);
    steps.push({ type: 'visit', row, col, path: [...path], message: `Visiting ${board[row][col]} at [${row},${col}]` });
    for (const [dr, dc] of directions) if (backtrack(row + dr, col + dc, index + 1, visited, path)) return true;
    visited[row][col] = false;
    path.pop();
    steps.push({ type: 'backtrack', row, col, path: [...path], message: `Backtracking from [${row},${col}]` });
    return false;
  }
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const visited = Array(rows).fill().map(() => Array(cols).fill(false)); backtrack(i, j, 0, visited, []); }
  return { solutions, steps };
}

// Rat in a Maze: returns { solutions, steps }
export function solveRatMazeWithSteps(maze) {
  const steps = [];
  const rows = maze.length;
  const cols = maze[0].length;
  const solutions = [];
  function backtrack(row, col, visited, path) {
    if (row === rows - 1 && col === cols - 1) {
      path.push([row, col]);
      solutions.push([...path]);
      steps.push({ type: 'solution', path: [...path], message: 'Found path to destination!' });
      path.pop();
      return;
    }
    if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || maze[row][col] === 0) return;
    visited[row][col] = true;
    path.push([row, col]);
    steps.push({ type: 'visit', row, col, path: [...path], message: `Visiting [${row},${col}]` });
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [dr, dc] of directions) backtrack(row + dr, col + dc, visited, path);
    visited[row][col] = false;
    path.pop();
    steps.push({ type: 'backtrack', row, col, path: [...path], message: `Backtracking from [${row},${col}]` });
  }
  const visited = Array(rows).fill().map(() => Array(cols).fill(false));
  backtrack(0, 0, visited, []);
  return { solutions, steps };
} 