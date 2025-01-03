import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GameProvider } from './contexts/GameContext';
import Welcome from './components/Welcome';
import Game from './components/Game';
import Settings from './components/Settings';
import Rules from './components/Rules';
import Stats from './components/Stats';
import Achievements from './components/Achievements';
import GameHistory from './components/GameHistory';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [gameState, setGameState] = useState({
    mode: 'pvp',
    scores: { player1: 0, player2: 0, ai: 0 },
  });

  const handleNavigate = (page, state = {}) => {
    if (page === 'game') {
      setGameState((prev) => ({ ...prev, ...state }));
    }
    setCurrentPage(page);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const renderPage = () => {
    const pages = {
      welcome: <Welcome onNavigate={handleNavigate} />,
      game: <Game gameState={gameState} onNavigate={handleNavigate} />,
      settings: <Settings onNavigate={handleNavigate} />,
      rules: <Rules onNavigate={handleNavigate} />,
      stats: <Stats onNavigate={handleNavigate} />,
      achievements: <Achievements onNavigate={handleNavigate} />,
      history: <GameHistory onNavigate={handleNavigate} />,
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="min-h-screen"
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GameProvider>
          <div className="min-h-screen bg-[rgb(var(--game-primary))] text-[rgb(var(--game-light))]">
            {/* Arkaplan Efektleri */}
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--game-secondary),0.1),transparent_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--game-secondary),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--game-secondary),0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {/* Ana İçerik */}
            <div className="relative z-10">{renderPage()}</div>
          </div>
        </GameProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
