import { DIFFICULTY } from '../contexts/GameContext';

// Minimax algoritması için skor değerleri
const scores = {
  X: -10, // İnsan oyuncu
  O: 10, // Bilgisayar
  draw: 0, // Beraberlik
};

// Boş kareleri bul
const getEmptySquares = (board) => {
  return board.reduce((squares, square, index) => {
    if (!square) squares.push(index);
    return squares;
  }, []);
};

// Kazananı kontrol et (Game.jsx'teki calculateWinner fonksiyonunun aynısı)
const checkWinner = (board, size, winCount) => {
  // Yatay kontrol
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winCount; j++) {
      const row = board.slice(i * size + j, i * size + j + winCount);
      if (row.every((cell) => cell === 'X')) return 'X';
      if (row.every((cell) => cell === 'O')) return 'O';
    }
  }

  // Dikey kontrol
  for (let i = 0; i <= size - winCount; i++) {
    for (let j = 0; j < size; j++) {
      const column = Array(winCount)
        .fill(0)
        .map((_, k) => board[(i + k) * size + j]);
      if (column.every((cell) => cell === 'X')) return 'X';
      if (column.every((cell) => cell === 'O')) return 'O';
    }
  }

  // Çapraz kontrol
  for (let i = 0; i <= size - winCount; i++) {
    for (let j = 0; j <= size - winCount; j++) {
      const diagonal1 = Array(winCount)
        .fill(0)
        .map((_, k) => board[(i + k) * size + j + k]);
      const diagonal2 = Array(winCount)
        .fill(0)
        .map((_, k) => board[(i + k) * size + (j + winCount - 1) - k]);

      if (diagonal1.every((cell) => cell === 'X')) return 'X';
      if (diagonal1.every((cell) => cell === 'O')) return 'O';
      if (diagonal2.every((cell) => cell === 'X')) return 'X';
      if (diagonal2.every((cell) => cell === 'O')) return 'O';
    }
  }

  return board.includes(null) ? null : 'draw';
};

// Minimax algoritması
const minimax = (board, depth, isMaximizing, alpha, beta, size, winCount) => {
  const winner = checkWinner(board, size, winCount);

  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    const emptySquares = getEmptySquares(board);

    for (const square of emptySquares) {
      board[square] = 'O';
      const score = minimax(
        board,
        depth + 1,
        false,
        alpha,
        beta,
        size,
        winCount,
      );
      board[square] = null;

      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, score);

      if (beta <= alpha) break; // Alpha-beta budama
    }

    return bestScore;
  } else {
    let bestScore = Infinity;
    const emptySquares = getEmptySquares(board);

    for (const square of emptySquares) {
      board[square] = 'X';
      const score = minimax(
        board,
        depth + 1,
        true,
        alpha,
        beta,
        size,
        winCount,
      );
      board[square] = null;

      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, score);

      if (beta <= alpha) break; // Alpha-beta budama
    }

    return bestScore;
  }
};

// Zorluk seviyesine göre rastgele hamle yapma olasılığı
const randomMoveChance = {
  [DIFFICULTY.EASY]: 0.7, // %70 rastgele hamle
  [DIFFICULTY.MEDIUM]: 0.3, // %30 rastgele hamle
  [DIFFICULTY.HARD]: 0, // Her zaman en iyi hamle
};

// Ana AI fonksiyonu
export const getBestMove = (board, settings) => {
  const { boardSize: size, winCondition: winCount, difficulty } = settings;

  // Rastgele hamle yapılıp yapılmayacağını kontrol et
  if (Math.random() < randomMoveChance[difficulty]) {
    const emptySquares = getEmptySquares(board);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  let bestScore = -Infinity;
  let bestMove = null;
  const emptySquares = getEmptySquares(board);

  // Her boş kare için minimax algoritmasını çalıştır
  for (const square of emptySquares) {
    board[square] = 'O';
    const score = minimax(board, 0, false, -Infinity, Infinity, size, winCount);
    board[square] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = square;
    }
  }

  return bestMove;
};
