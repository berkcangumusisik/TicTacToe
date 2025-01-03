import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';
import { DIFFICULTY } from '../contexts/GameContext';
import ScoreBoard from './ScoreBoard';
import { getBestMove } from '../utils/aiPlayer';
import Confetti from 'react-confetti';

function Game({ gameState, onNavigate }) {
  const { mode, scores } = gameState;
  const { state, dispatch } = useGame();
  const { settings } = state;
  const { t } = useLanguage();

  const [board, setBoard] = useState(
    Array(settings.boardSize * settings.boardSize).fill(null),
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [winLine, setWinLine] = useState(null);

  // Zorluk seçimi için modal state'i
  const [showDifficultyModal, setShowDifficultyModal] = useState(mode === 'ai');

  const calculateWinner = (squares) => {
    const size = settings.boardSize;
    const winCount = settings.winCondition;

    // Yatay kontrol
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winCount; j++) {
        const row = squares.slice(i * size + j, i * size + j + winCount);
        if (row.every((cell) => cell === 'X')) return 'X';
        if (row.every((cell) => cell === 'O')) return 'O';
      }
    }

    // Dikey kontrol
    for (let i = 0; i <= size - winCount; i++) {
      for (let j = 0; j < size; j++) {
        const column = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + j]);
        if (column.every((cell) => cell === 'X')) return 'X';
        if (column.every((cell) => cell === 'O')) return 'O';
      }
    }

    // Çapraz kontrol
    for (let i = 0; i <= size - winCount; i++) {
      for (let j = 0; j <= size - winCount; j++) {
        const diagonal1 = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + j + k]);
        const diagonal2 = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + (j + winCount - 1) - k]);

        if (diagonal1.every((cell) => cell === 'X')) return 'X';
        if (diagonal1.every((cell) => cell === 'O')) return 'O';
        if (diagonal2.every((cell) => cell === 'X')) return 'X';
        if (diagonal2.every((cell) => cell === 'O')) return 'O';
      }
    }

    return squares.includes(null) ? null : 'draw';
  };

  const checkAchievements = (winner, moveCount, gameTime) => {
    // İlk Galibiyet
    if (winner === 'X' && state.stats.totalGames === 1) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'firstWin' });
    }

    // Hız Şeytanı (10 saniyeden kısa sürede kazanma)
    if (winner === 'X' && gameTime < 10) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'speedDemon' });
    }

    // Yenilmez (5 oyun üst üste kazanma)
    if (winner === 'X' && state.stats.winStreak >= 5) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'unbeatable' });
    }

    // Yapay Zeka Ustası (Zor modda bilgisayarı yenme)
    if (
      winner === 'X' &&
      mode === 'ai' &&
      settings.difficulty === DIFFICULTY.HARD
    ) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'aiMaster' });
    }

    // Kusursuz Oyun (Geri almadan kazanma)
    if (winner === 'X' && moveHistory.length === moveCount) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'perfectGame' });
    }
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setMoveHistory([...moveHistory, { board: [...board], isXNext }]);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);

      // İstatistikleri güncelle
      const newStats = {
        totalGames: state.stats.totalGames + 1,
        winStreak: gameWinner === 'X' ? state.stats.winStreak + 1 : 0,
        bestTime:
          gameTime < (state.stats.bestTime || Infinity)
            ? gameTime
            : state.stats.bestTime,
        winRatio: {
          ...state.stats.winRatio,
          [mode === 'ai'
            ? gameWinner === 'X'
              ? 'player1'
              : 'ai'
            : gameWinner === 'X'
            ? 'player1'
            : 'player2']:
            state.stats.winRatio[
              gameWinner === 'X' ? 'player1' : mode === 'ai' ? 'ai' : 'player2'
            ] + 1,
        },
      };

      dispatch({ type: 'UPDATE_STATS', payload: newStats });

      // Başarımları kontrol et
      checkAchievements(gameWinner, board.filter(Boolean).length, gameTime);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const undoMove = () => {
    if (moveHistory.length === 0) return;
    const lastMove = moveHistory[moveHistory.length - 1];
    setBoard(lastMove.board);
    setIsXNext(lastMove.isXNext);
    setMoveHistory(moveHistory.slice(0, -1));
    setWinner(null);
  };

  const resetGame = () => {
    setBoard(Array(settings.boardSize * settings.boardSize).fill(null));
    setIsXNext(true);
    setWinner(null);
    setMoveHistory([]);
  };

  useEffect(() => {
    resetGame();
  }, [settings.boardSize]);

  useEffect(() => {
    let timer;
    if (settings.timeLimit > 0 && !winner) {
      timer = setInterval(() => {
        setGameTime((prev) => {
          if (prev >= settings.timeLimit) {
            setWinner('draw');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [settings.timeLimit, winner]);

  useEffect(() => {
    let timeoutId;

    if (mode === 'ai' && !isXNext && !winner) {
      timeoutId = setTimeout(() => {
        const aiMove = getBestMove(board, settings);
        if (aiMove !== null) {
          handleClick(aiMove);
        }
      }, 500); // 500ms gecikme ile hamle yap
    }

    return () => clearTimeout(timeoutId);
  }, [board, isXNext, winner, mode]);

  // Kazanan çizgisini hesapla
  const calculateWinLine = (squares, winner) => {
    if (!winner || winner === 'draw') return null;

    const size = settings.boardSize;
    const winCount = settings.winCondition;

    // Yatay kontrol
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winCount; j++) {
        const row = squares.slice(i * size + j, i * size + j + winCount);
        if (row.every((cell) => cell === winner)) {
          return {
            start: { x: j, y: i },
            end: { x: j + winCount - 1, y: i },
            type: 'horizontal',
          };
        }
      }
    }

    // Dikey kontrol
    for (let i = 0; i <= size - winCount; i++) {
      for (let j = 0; j < size; j++) {
        const column = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + j]);
        if (column.every((cell) => cell === winner)) {
          return {
            start: { x: j, y: i },
            end: { x: j, y: i + winCount - 1 },
            type: 'vertical',
          };
        }
      }
    }

    // Çapraz kontrol (sol üstten sağ alta)
    for (let i = 0; i <= size - winCount; i++) {
      for (let j = 0; j <= size - winCount; j++) {
        const diagonal = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + j + k]);
        if (diagonal.every((cell) => cell === winner)) {
          return {
            start: { x: j, y: i },
            end: { x: j + winCount - 1, y: i + winCount - 1 },
            type: 'diagonal',
          };
        }
      }
    }

    // Çapraz kontrol (sağ üstten sol alta)
    for (let i = 0; i <= size - winCount; i++) {
      for (let j = winCount - 1; j < size; j++) {
        const diagonal = Array(winCount)
          .fill(0)
          .map((_, k) => squares[(i + k) * size + j - k]);
        if (diagonal.every((cell) => cell === winner)) {
          return {
            start: { x: j, y: i },
            end: { x: j - winCount + 1, y: i + winCount - 1 },
            type: 'diagonal-reverse',
          };
        }
      }
    }

    return null;
  };

  // Oyun bittiğinde geçmişe ekle
  useEffect(() => {
    if (winner) {
      const gameRecord = {
        date: new Date().toISOString(),
        mode,
        winner,
        moves: moveHistory.length,
        boardSize: settings.boardSize,
        timeSpent: gameTime,
        opponent: mode === 'ai' ? 'AI' : 'Player2',
      };
      dispatch({ type: 'ADD_TO_HISTORY', payload: gameRecord });

      // Kazanan çizgisini hesapla
      setWinLine(calculateWinLine(board, winner));
    }
  }, [winner]);

  return (
    <div className="min-h-screen">
      {/* Zorluk Seçimi Modal */}
      <AnimatePresence>
        {showDifficultyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-sm w-full"
            >
              <h2 className="text-2xl font-bold text-center mb-6 gradient-text">
                {t('settings.difficulty')}
              </h2>
              <div className="space-y-3">
                {Object.values(DIFFICULTY).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      dispatch({
                        type: 'SET_DIFFICULTY',
                        payload: level,
                      });
                      setShowDifficultyModal(false);
                    }}
                    className={`
                      w-full py-3 px-6 rounded-xl text-lg font-medium
                      transition-all duration-300
                      ${
                        level === 'easy' &&
                        'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      }
                      ${
                        level === 'medium' &&
                        'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400'
                      }
                      ${
                        level === 'hard' &&
                        'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                      }
                    `}
                  >
                    {t(`game.difficulty.${level}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Üst Bar */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => onNavigate('welcome')}
            className="glass-button px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>{t('back')}</span>
          </button>

          {settings.timeLimit > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="glass-panel px-6 py-3 flex items-center gap-3"
            >
              <ClockIcon className="w-5 h-5 text-[rgb(var(--game-accent))]" />
              <span className="text-xl font-bold text-[rgb(var(--game-accent))]">
                {settings.timeLimit - gameTime}s
              </span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sol Taraf - Oyun Tahtası */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card relative overflow-hidden"
            >
              {/* Arkaplan Efektleri */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--game-secondary))/0.1] to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgb(var(--game-accent))/0.15,transparent_50%)]" />

              {/* Oyun Durumu */}
              <div className="relative z-10 text-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={winner || isXNext}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative"
                  >
                    {winner ? (
                      <div className="flex items-center justify-center gap-3">
                        <TrophyIcon className="w-8 h-8 text-yellow-400 animate-bounce-slow" />
                        <span className="text-4xl font-bold gradient-text">
                          {winner === 'draw'
                            ? t('game.draw')
                            : `${t('game.winner')}: ${winner}`}
                        </span>
                        <SparklesIcon className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-medium text-[rgb(var(--game-light))]">
                          {t('game.nextPlayer')}:
                        </span>
                        <span
                          className={`text-3xl font-bold ${
                            isXNext
                              ? 'text-[rgb(var(--game-secondary))]'
                              : 'text-[rgb(var(--game-accent))]'
                          }`}
                        >
                          {isXNext ? 'X' : 'O'}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Oyun Tahtası */}
              <div className="flex justify-center items-center my-8">
                <motion.div
                  className="relative bg-[rgb(var(--game-dark))] rounded-2xl p-2 shadow-2xl"
                  style={{
                    width: 'min(90vw, 400px)',
                    aspectRatio: '1',
                  }}
                >
                  {/* Izgara Çizgileri */}
                  <div
                    className="absolute inset-0 grid rounded-2xl overflow-hidden"
                    style={{
                      gridTemplateColumns: `repeat(${settings.boardSize}, 1fr)`,
                      gap: '2px',
                      backgroundColor: 'rgb(var(--game-light)/0.15)',
                      padding: '2px',
                    }}
                  >
                    {Array(settings.boardSize * settings.boardSize)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-[rgb(var(--game-dark))] rounded-sm"
                        />
                      ))}
                  </div>

                  {/* Oyun Kareleri */}
                  <div
                    className="relative grid w-full h-full"
                    style={{
                      gridTemplateColumns: `repeat(${settings.boardSize}, 1fr)`,
                      gap: '2px',
                    }}
                  >
                    {board.map((square, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleClick(i)}
                        disabled={!!winner || !!board[i]}
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                          aspect-square flex items-center justify-center
                          text-3xl md:text-4xl font-bold rounded-sm
                          transition-all duration-300 relative
                          ${
                            !square &&
                            !winner &&
                            'hover:bg-[rgb(var(--game-light))/0.1]'
                          }
                          ${
                            square === 'X'
                              ? 'text-[rgb(var(--game-secondary))]'
                              : 'text-[rgb(var(--game-accent))]'
                          }
                        `}
                      >
                        {square && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 200,
                              damping: 15,
                            }}
                            className={`
                              absolute inset-0 flex items-center justify-center
                              ${
                                square === 'X'
                                  ? 'bg-[rgb(var(--game-secondary))/0.1]'
                                  : 'bg-[rgb(var(--game-accent))/0.1]'
                              }
                            `}
                          >
                            {square}
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Kazanan Çizgisi */}
                  {winLine && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute z-10"
                      style={{
                        position: 'absolute',
                        height:
                          winLine.type === 'horizontal'
                            ? '4px'
                            : winLine.type === 'vertical'
                            ? `${
                                (100 / settings.boardSize) *
                                settings.winCondition
                              }%`
                            : `${
                                Math.sqrt(2) *
                                ((100 / settings.boardSize) *
                                  settings.winCondition)
                              }%`,
                        width:
                          winLine.type === 'vertical'
                            ? '4px'
                            : winLine.type === 'horizontal'
                            ? `${
                                (100 / settings.boardSize) *
                                settings.winCondition
                              }%`
                            : '4px',
                        top: `${
                          (winLine.start.y + 0.5) * (100 / settings.boardSize)
                        }%`,
                        left: `${
                          (winLine.start.x + 0.5) * (100 / settings.boardSize)
                        }%`,
                        transformOrigin: 'left center',
                        transform:
                          winLine.type === 'horizontal'
                            ? 'translateY(-50%)'
                            : winLine.type === 'vertical'
                            ? 'translateX(-50%)'
                            : winLine.type === 'diagonal'
                            ? 'rotate(45deg)'
                            : 'rotate(-45deg)',
                        background: `linear-gradient(90deg, 
                          rgb(var(--game-${
                            winner === 'X' ? 'secondary' : 'accent'
                          })) 0%,
                          rgb(var(--game-${
                            winner === 'X' ? 'secondary' : 'accent'
                          })/.5) 100%
                        )`,
                        boxShadow: `0 0 10px rgb(var(--game-${
                          winner === 'X' ? 'secondary' : 'accent'
                        }))`,
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Kontrol Butonları */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-4"
            >
              {settings.allowUndo && moveHistory.length > 0 && !winner && (
                <button
                  onClick={undoMove}
                  className="glass-button px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5" />
                  {t('game.undo')}
                </button>
              )}

              <button
                onClick={resetGame}
                className="glass-button px-6 py-3 flex items-center gap-2 
                         bg-[rgb(var(--game-secondary))/0.2] hover:bg-[rgb(var(--game-secondary))/0.3]
                         hover:scale-105 transition-all"
              >
                <ArrowPathIcon className="w-5 h-5" />
                {t('game.newGame')}
              </button>
            </motion.div>
          </div>

          {/* Sağ Taraf - Skor Tablosu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96"
          >
            <ScoreBoard gameMode={mode} scores={scores} />
          </motion.div>
        </div>
      </div>

      {/* Başarım bildirimi */}
      <AnimatePresence>
        {state.achievements.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 p-4 bg-[rgb(var(--game-secondary))/0.9] 
                     rounded-lg shadow-lg text-white"
          >
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              <span>{t('achievements.unlocked')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konfeti */}
      {winner === 'X' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={[
            `rgb(var(--game-secondary))`,
            `rgb(var(--game-accent))`,
            `rgb(var(--game-light))`,
          ]}
        />
      )}
    </div>
  );
}

export default Game;
