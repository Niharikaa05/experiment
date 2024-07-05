document.addEventListener('DOMContentLoaded', () => {
  const rows = 6;
  const cols = 7;
  const board = [];
  let currentPlayer = 1;
  
  const boardElement = document.getElementById('board');
  const restartButton = document.getElementById('restart');

  // Initialize board array
  for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
          row.push(null);
      }
      board.push(row);
  }

  // Create board cells
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = r;
          cell.dataset.col = c;
          cell.addEventListener('click', handleCellClick);
          boardElement.appendChild(cell);
      }
  }

  // Handle cell click
  function handleCellClick(e) {
      const col = parseInt(e.target.dataset.col);
      for (let r = rows - 1; r >= 0; r--) {
          if (!board[r][col]) {
              board[r][col] = currentPlayer;
              const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
              cell.classList.add(`player${currentPlayer}`);
              if (checkWin(r, col)) {
                  alert(`Player ${currentPlayer} wins!`);
                  resetBoard();
              }
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              return;
          }
      }
  }

  // Check win
  function checkWin(row, col) {
      const directions = [
          { r: 0, c: 1 },  // Horizontal
          { r: 1, c: 0 },  // Vertical
          { r: 1, c: 1 },  // Diagonal /
          { r: 1, c: -1 }  // Diagonal \
      ];

      for (const { r: dr, c: dc } of directions) {
          let count = 1;
          for (let d = 1; d < 4; d++) {
              const nr = row + dr * d;
              const nc = col + dc * d;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === currentPlayer) {
                  count++;
              } else {
                  break;
              }
          }
          for (let d = -1; d > -4; d--) {
              const nr = row + dr * d;
              const nc = col + dc * d;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === currentPlayer) {
                  count++;
              } else {
                  break;
              }
          }
          if (count >= 4) {
              return true;
          }
      }
      return false;
  }

  // Reset board
  function resetBoard() {
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
              board[r][c] = null;
              const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
              cell.classList.remove('player1', 'player2');
          }
      }
      currentPlayer = 1;
  }

  // Restart button
  restartButton.addEventListener('click', resetBoard);
});
