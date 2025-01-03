import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGame } from '../contexts/GameContext';
import { THEMES } from '../contexts/ThemeContext';
import { DIFFICULTY } from '../contexts/GameContext';

function Settings({ onNavigate }) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useGame();
  const { settings } = state;

  const handleSettingChange = (type, value) => {
    if (dispatch) {
      dispatch({ type, payload: value });
    }
  };

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
              {t('settings.title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--game-secondary))] to-[rgb(var(--game-accent))] rounded-full mb-8" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Oyun Ayarları */}
            <motion.div variants={item} className="space-y-6">
              <h2 className="text-2xl font-semibold text-[rgb(var(--game-secondary))]">
                {t('settings.gameSettings')}
              </h2>

              <div className="space-y-4">
                {/* Tahta Boyutu */}
                <div className="glass-panel p-4">
                  <label className="block text-sm mb-2">
                    {t('settings.boardSize')}
                  </label>
                  <div className="flex gap-2">
                    {[3, 4, 5].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          handleSettingChange('SET_BOARD_SIZE', size)
                        }
                        className={`
                          flex-1 py-2 rounded-lg transition-all duration-300
                          ${
                            settings.boardSize === size
                              ? 'bg-[rgb(var(--game-secondary))] text-white font-semibold'
                              : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                          }
                        `}
                      >
                        {size}x{size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kazanma Şartı */}
                <div className="glass-panel p-4">
                  <label className="block text-sm mb-2">
                    {t('settings.winCondition')}
                  </label>
                  <div className="flex gap-2">
                    {[3, 4, 5].map((count) => (
                      <button
                        key={count}
                        onClick={() =>
                          handleSettingChange('SET_WIN_CONDITION', count)
                        }
                        className={`
                          flex-1 py-2 rounded-lg transition-all duration-300
                          ${
                            settings.winCondition === count
                              ? 'bg-[rgb(var(--game-accent))] text-white font-semibold'
                              : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                          }
                        `}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Süre Sınırı */}
                <div className="glass-panel p-4">
                  <label className="block text-sm mb-2">
                    {t('settings.timeLimit')}
                  </label>
                  <div className="flex gap-2">
                    {[0, 30, 60].map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          handleSettingChange('SET_TIME_LIMIT', time)
                        }
                        className={`
                          flex-1 py-2 rounded-lg transition-all duration-300
                          ${
                            settings.timeLimit === time
                              ? 'bg-[rgb(var(--game-secondary))] text-white font-semibold'
                              : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                          }
                        `}
                      >
                        {time || t('settings.off')}
                        {time ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Geri Alma */}
                <div className="glass-panel p-4">
                  <label className="block text-sm mb-2">
                    {t('settings.allowUndo')}
                  </label>
                  <div className="flex gap-2">
                    {[true, false].map((allowed) => (
                      <button
                        key={String(allowed)}
                        onClick={() =>
                          handleSettingChange('SET_ALLOW_UNDO', allowed)
                        }
                        className={`
                          flex-1 py-2 rounded-lg transition-all duration-300
                          ${
                            settings.allowUndo === allowed
                              ? 'bg-[rgb(var(--game-accent))] text-white font-semibold'
                              : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                          }
                        `}
                      >
                        {t(allowed ? 'settings.on' : 'settings.off')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Zorluk Seviyesi */}
                <div className="glass-panel p-4">
                  <label className="block text-sm mb-2">
                    {t('settings.difficulty')}
                  </label>
                  <div className="flex gap-2">
                    {Object.values(DIFFICULTY).map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          handleSettingChange('SET_DIFFICULTY', level)
                        }
                        className={`
                          flex-1 py-2 rounded-lg transition-all duration-300
                          ${
                            settings.difficulty === level
                              ? 'bg-[rgb(var(--game-accent))] text-white font-semibold'
                              : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                          }
                        `}
                      >
                        {t(`game.difficulty.${level}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Görünüm Ayarları */}
            <motion.div variants={item} className="space-y-6">
              <h2 className="text-2xl font-semibold text-[rgb(var(--game-accent))]">
                {t('settings.appearance')}
              </h2>

              {/* Tema */}
              <div className="glass-panel p-4">
                <label className="block text-sm mb-2">
                  {t('settings.theme')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(THEMES).map((themeName) => (
                    <button
                      key={themeName}
                      onClick={() => setTheme(themeName)}
                      className={`
                        p-3 rounded-lg transition-all duration-300 capitalize
                        ${
                          theme === themeName
                            ? 'bg-[rgb(var(--game-secondary))] text-white font-semibold'
                            : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                        }
                      `}
                    >
                      {themeName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dil */}
              <div className="glass-panel p-4">
                <label className="block text-sm mb-2">
                  {t('settings.language')}
                </label>
                <div className="flex gap-2">
                  {['TR', 'EN'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`
                        flex-1 py-2 rounded-lg transition-all duration-300
                        ${
                          language === lang
                            ? 'bg-[rgb(var(--game-accent))] text-white font-semibold'
                            : 'bg-[rgb(var(--game-light)/0.1)] hover:bg-[rgb(var(--game-light)/0.2)]'
                        }
                      `}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;
