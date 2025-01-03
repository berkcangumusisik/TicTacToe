import PropTypes from 'prop-types';
import {
  TrophyIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

function Welcome({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-4">
      {/* Arkaplan Efektleri */}
      <div className="absolute inset-0 bg-gradient-radial from-game-secondary/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(120,119,198,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-game-secondary via-game-accent to-game-secondary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
              {t('welcome.title')}
            </span>
          </h1>
          <div className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-game-secondary to-game-accent" />
        </div>

        {/* Ana Oyun Modları */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => onNavigate('game', { mode: 'pvp' })}
            className="group relative w-full flex items-center justify-center gap-4 p-6 rounded-2xl
                     bg-gradient-to-r from-game-secondary/20 to-game-secondary/10
                     hover:from-game-secondary/30 hover:to-game-secondary/20
                     border border-game-secondary/30 hover:border-game-secondary
                     transform transition-all duration-300 hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-game-secondary/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="p-3 rounded-xl bg-game-secondary/20">
              <UserGroupIcon className="w-8 h-8 text-game-secondary" />
            </div>
            <span className="text-xl font-bold text-game-secondary">
              {t('welcome.pvp')}
            </span>
          </button>

          <button
            onClick={() => onNavigate('game', { mode: 'ai' })}
            className="group relative w-full flex items-center justify-center gap-4 p-6 rounded-2xl
                     bg-gradient-to-r from-game-accent/20 to-game-accent/10
                     hover:from-game-accent/30 hover:to-game-accent/20
                     border border-game-accent/30 hover:border-game-accent
                     transform transition-all duration-300 hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-game-accent/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="p-3 rounded-xl bg-game-accent/20">
              <ComputerDesktopIcon className="w-8 h-8 text-game-accent" />
            </div>
            <span className="text-xl font-bold text-game-accent">
              {t('welcome.ai')}
            </span>
          </button>
        </div>

        {/* Alt Menü */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <MenuButton
                icon={<TrophyIcon className="w-6 h-6" />}
                label={t('welcome.rules')}
                onClick={() => onNavigate('rules')}
              />
              <MenuButton
                icon={<SparklesIcon className="w-6 h-6" />}
                label={t('welcome.achievements')}
                onClick={() => onNavigate('achievements')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MenuButton
                icon={<ChartBarIcon className="w-6 h-6" />}
                label={t('welcome.stats')}
                onClick={() => onNavigate('stats')}
              />
              <MenuButton
                icon={<Cog6ToothIcon className="w-6 h-6" />}
                label={t('welcome.settings')}
                onClick={() => onNavigate('settings')}
              />
            </div>
          </div>

          {/* Oyun Geçmişi - Tam Genişlik */}
          <button
            onClick={() => onNavigate('history')}
            className="w-full glass-button p-6 flex items-center gap-4 
                     hover:bg-[rgb(var(--game-light))/0.1]
                     transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="p-3 rounded-xl bg-[rgb(var(--game-secondary))/0.2]">
              <ClockIcon className="w-6 h-6 text-[rgb(var(--game-secondary))]" />
            </div>
            <span className="text-lg font-medium">
              {t('gameHistory.title')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Alt menü butonu bileşeni
function MenuButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl
                bg-game-dark/40 hover:bg-game-dark/60 backdrop-blur-sm
                border border-game-light/10 hover:border-game-light/30
                transform transition-all duration-300 hover:scale-105"
    >
      <div className="text-game-light/70 group-hover:text-game-light transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-game-light/70 group-hover:text-game-light transition-colors">
        {label}
      </span>
    </button>
  );
}

MenuButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Welcome.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default Welcome;
