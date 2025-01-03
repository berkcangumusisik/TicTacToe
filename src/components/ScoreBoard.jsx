import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

function ScoreBoard({ gameMode, scores }) {
  const { t } = useLanguage();

  const PlayerScore = ({ player, score, color = 'secondary', icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-[rgb(var(--game-${color})/0.2)] 
                      flex items-center justify-center text-[rgb(var(--game-${color}))]`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-medium text-[rgb(var(--game-light))]">
          {player}
        </h3>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-bold text-[rgb(var(--game-${color}))]`}>
          {score}
        </span>
        <span className="text-sm text-[rgb(var(--game-light))/0.7]">
          {t('game.points')}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <PlayerScore
        player={t('game.player1')}
        score={scores.player1}
        color="secondary"
        icon="X"
      />
      {gameMode === 'pvp' ? (
        <PlayerScore
          player={t('game.player2')}
          score={scores.player2}
          color="accent"
          icon="O"
        />
      ) : (
        <PlayerScore
          player={t('game.computer')}
          score={scores.ai}
          color="accent"
          icon="🤖"
        />
      )}
    </div>
  );
}

export default ScoreBoard;
