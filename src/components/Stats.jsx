import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';

function Stats({ onNavigate }) {
  const { t } = useLanguage();
  const { state } = useGame();
  const { stats } = state;

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

  const StatCard = ({ title, value, color = 'secondary', icon }) => (
    <motion.div variants={item} className="glass-panel p-6">
      <div className="flex items-center gap-4 mb-3">
        <div
          className={`w-12 h-12 rounded-xl bg-[rgb(var(--game-${color})/0.2)] 
                        flex items-center justify-center text-[rgb(var(--game-${color}))]`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-medium text-[rgb(var(--game-light)/0.9)]">
          {title}
        </h3>
      </div>
      <p className={`text-4xl font-bold text-[rgb(var(--game-${color}))]`}>
        {value}
      </p>
    </motion.div>
  );

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
              {t('stats.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--game-secondary))] to-[rgb(var(--game-accent))] rounded-full mb-8" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title={t('stats.totalGames')}
              value={stats.totalGames}
              icon="🎮"
            />
            <StatCard
              title={t('stats.winRate')}
              value={`${Math.round(
                (stats.winRatio.player1 / stats.totalGames) * 100 || 0,
              )}%`}
              color="accent"
              icon="📈"
            />
            <StatCard
              title={t('stats.bestTime')}
              value={stats.bestTime ? `${stats.bestTime}s` : '-'}
              color="secondary"
              icon="⚡"
            />
            <StatCard
              title={t('stats.winStreak')}
              value={stats.winStreak}
              color="accent"
              icon="🔥"
            />
          </div>

          <motion.div variants={item} className="mt-8">
            <h2 className="text-2xl font-semibold text-[rgb(var(--game-secondary))] mb-4">
              {t('stats.details')}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-panel p-6">
                <h3 className="text-lg font-medium text-[rgb(var(--game-light)/0.9)] mb-4">
                  {t('stats.againstPlayer')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--game-light)/0.7)]">
                      {t('game.player1')}
                    </span>
                    <span className="text-xl font-semibold text-[rgb(var(--game-secondary))]">
                      {stats.winRatio.player1}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--game-light)/0.7)]">
                      {t('game.player2')}
                    </span>
                    <span className="text-xl font-semibold text-[rgb(var(--game-accent))]">
                      {stats.winRatio.player2}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-lg font-medium text-[rgb(var(--game-light)/0.9)] mb-4">
                  {t('stats.againstAI')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--game-light)/0.7)]">
                      {t('game.player1')}
                    </span>
                    <span className="text-xl font-semibold text-[rgb(var(--game-secondary))]">
                      {stats.winRatio.player1}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--game-light)/0.7)]">
                      {t('game.computer')}
                    </span>
                    <span className="text-xl font-semibold text-[rgb(var(--game-accent))]">
                      {stats.winRatio.ai}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Stats;
