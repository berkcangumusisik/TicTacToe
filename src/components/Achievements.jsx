import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useGame } from '../contexts/GameContext';

function Achievements({ onNavigate }) {
  const { t } = useLanguage();
  const { state } = useGame();
  const { achievements } = state;

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

  const achievementsList = [
    { id: 'firstWin', icon: '🏆' },
    { id: 'speedDemon', icon: '⚡' },
    { id: 'unbeatable', icon: '👑' },
    { id: 'aiMaster', icon: '🤖' },
    { id: 'perfectGame', icon: '✨' },
  ];

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
              {t('achievements.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--game-secondary))] to-[rgb(var(--game-accent))] rounded-full mb-8" />
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {achievementsList.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={item}
                className={`glass-panel p-6 ${
                  achievements.has(achievement.id)
                    ? 'bg-[rgb(var(--game-secondary)/0.1)]'
                    : 'opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    ${
                      achievements.has(achievement.id)
                        ? 'bg-[rgb(var(--game-secondary)/0.2)] animate-pulse-glow'
                        : 'bg-[rgb(var(--game-light)/0.1)]'
                    }
                  `}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <h3
                      className={`
                      text-lg font-semibold mb-1
                      ${
                        achievements.has(achievement.id)
                          ? 'text-[rgb(var(--game-secondary))]'
                          : 'text-[rgb(var(--game-light)/0.7)]'
                      }
                    `}
                    >
                      {t(`achievements.${achievement.id}.title`)}
                    </h3>
                    <p className="text-[rgb(var(--game-light)/0.6] text-sm">
                      {t(`achievements.${achievement.id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Achievements;
