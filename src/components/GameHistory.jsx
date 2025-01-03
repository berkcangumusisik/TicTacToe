import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';

function GameHistory({ onNavigate }) {
  const { t } = useLanguage();
  const { state } = useGame();
  const { gameHistory } = state;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => onNavigate('welcome')}
          className="glass-button px-4 py-2 mb-8 flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="card"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {t('gameHistory.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--game-secondary))] to-[rgb(var(--game-accent))] rounded-full mb-8" />
          </motion.div>

          {gameHistory.length === 0 ? (
            <motion.div
              variants={item}
              className="text-center text-[rgb(var(--game-light))/0.7 py-8"
            >
              {t('stats.noGames')}
            </motion.div>
          ) : (
            <div className="space-y-4">
              {gameHistory.map((game, index) => (
                <motion.div
                  key={game.date}
                  variants={item}
                  className="glass-panel p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center text-xl
                          ${
                            game.winner === 'X'
                              ? 'bg-[rgb(var(--game-secondary))/0.2] text-[rgb(var(--game-secondary))]'
                              : game.winner === 'O'
                              ? 'bg-[rgb(var(--game-accent))/0.2] text-[rgb(var(--game-accent))]'
                              : 'bg-[rgb(var(--game-light))/0.2] text-[rgb(var(--game-light))]'
                          }
                        `}
                      >
                        {game.winner === 'draw' ? '=' : game.winner}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {game.winner === 'draw'
                            ? t('game.draw')
                            : `${
                                game.winner === 'X'
                                  ? t('game.player1')
                                  : game.mode === 'ai'
                                  ? t('game.computer')
                                  : t('game.player2')
                              } ${t('gameHistory.wins')}`}
                        </h3>
                        <p className="text-[rgb(var(--game-light))/0.7">
                          {new Date(game.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium
                        ${
                          game.mode === 'ai'
                            ? 'bg-[rgb(var(--game-secondary))/0.2] text-[rgb(var(--game-secondary))]'
                            : 'bg-[rgb(var(--game-accent))/0.2] text-[rgb(var(--game-accent))]'
                        }
                      `}
                    >
                      {game.mode === 'ai'
                        ? t('stats.againstAI')
                        : t('stats.againstPlayer')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel p-4">
                      <p className="text-sm text-[rgb(var(--game-light))/0.7] mb-1">
                        {t('gameHistory.boardSize')}
                      </p>
                      <p className="text-lg font-semibold">
                        {game.boardSize}x{game.boardSize}
                      </p>
                    </div>
                    <div className="glass-panel p-4">
                      <p className="text-sm text-[rgb(var(--game-light))/0.7] mb-1">
                        {t('gameHistory.moves')}
                      </p>
                      <p className="text-lg font-semibold">{game.moves}</p>
                    </div>
                    <div className="glass-panel p-4">
                      <p className="text-sm text-[rgb(var(--game-light))/0.7] mb-1">
                        {t('gameHistory.time')}
                      </p>
                      <p className="text-lg font-semibold">{game.timeSpent}s</p>
                    </div>
                    {game.mode === 'ai' && (
                      <div className="glass-panel p-4">
                        <p className="text-sm text-[rgb(var(--game-light))/0.7] mb-1">
                          {t('settings.difficulty')}
                        </p>
                        <p className="text-lg font-semibold capitalize">
                          {t(`game.difficulty.${game.difficulty}`)}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default GameHistory;
