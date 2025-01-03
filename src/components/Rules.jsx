import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

function Rules({ onNavigate }) {
  const { t } = useLanguage();

  const rules = [
    {
      title: t('rules.goal'),
      description: t('rules.goalDescription'),
      icon: '🎯',
    },
    {
      title: t('rules.turns'),
      description: t('rules.turnsDescription'),
      icon: '🔄',
    },
    {
      title: t('rules.winning'),
      description: t('rules.winningDescription'),
      icon: '🏆',
    },
    {
      title: t('rules.ai'),
      description: t('rules.aiDescription'),
      icon: '🤖',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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

        <div className="card">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-8"
          >
            <motion.div variants={item}>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                {t('rules.title')}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--game-secondary))] to-[rgb(var(--game-accent))] rounded-full" />
            </motion.div>

            <motion.div
              variants={container}
              className="grid gap-6 md:grid-cols-2"
            >
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="glass-panel p-6 space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{rule.icon}</span>
                    <h3 className="text-xl font-semibold gradient-text">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-[rgb(var(--game-light))/80 leading-relaxed">
                    {rule.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
