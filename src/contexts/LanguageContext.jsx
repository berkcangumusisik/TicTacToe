import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LanguageContext = createContext();

export const LANGUAGES = {
  TR: {
    // Genel
    back: 'Geri',
    points: 'Puan',
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',

    // Ana Menü
    welcome: {
      title: 'XOX Oyunu',
      pvp: 'İki Oyunculu',
      ai: 'Bilgisayara Karşı',
      rules: 'Nasıl Oynanır?',
      settings: 'Ayarlar',
      stats: 'İstatistikler',
      achievements: 'Başarımlar',
    },

    // Oyun
    game: {
      player1: '1. Oyuncu (X)',
      player2: '2. Oyuncu (O)',
      computer: 'Bilgisayar',
      winner: 'Kazanan',
      draw: 'Berabere!',
      nextPlayer: 'Sıradaki Oyuncu',
      newGame: 'Yeni Oyun',
      undo: 'Hamleyi Geri Al',
      points: 'Puan',
      timeLeft: 'Kalan Süre',
      difficulty: {
        easy: 'Kolay',
        medium: 'Orta',
        hard: 'Zor',
      },
    },

    // Ayarlar
    settings: {
      title: 'Ayarlar',
      gameSettings: 'Oyun Ayarları',
      appearance: 'Görünüm',
      boardSize: 'Tahta Boyutu',
      winCondition: 'Kazanma Şartı',
      timeLimit: 'Süre Sınırı',
      allowUndo: 'Hamle Geri Alma',
      theme: 'Tema',
      language: 'Dil',
      on: 'Açık',
      off: 'Kapalı',
      seconds: 'saniye',
      difficulty: 'Zorluk Seviyesi',
    },

    // İstatistikler
    stats: {
      title: 'İstatistikler',
      totalGames: 'Toplam Oyun Sayısı',
      winRate: 'Kazanma Oranı',
      bestTime: 'En İyi Süre',
      winStreak: 'En Uzun Galibiyet Serisi',
      againstAI: 'Bilgisayara Karşı',
      againstPlayer: 'Oyuncuya Karşı',
      details: 'Ayrıntılar',
      noGames: 'Henüz hiç oyun oynanmadı',
      recentGames: 'Son Oyunlar',
      moves: 'Hamle',
    },

    // Başarımlar
    achievements: {
      title: 'Başarımlar',
      locked: 'Kilitli',
      unlocked: 'Kazanıldı',
      firstWin: {
        title: 'İlk Zafer',
        description: 'İlk oyununu kazan',
      },
      speedDemon: {
        title: 'Hız Ustası',
        description: '10 saniyeden kısa sürede kazan',
      },
      unbeatable: {
        title: 'Yenilmez Şampiyon',
        description: 'Üst üste 5 oyun kazan',
      },
      aiMaster: {
        title: 'Yapay Zeka Ustası',
        description: 'Zor seviyede bilgisayarı yen',
      },
      perfectGame: {
        title: 'Kusursuz Oyun',
        description: 'Hiç geri almadan bir oyun kazan',
      },
    },

    // Kurallar
    rules: {
      title: 'Nasıl Oynanır?',
      goal: 'Oyunun Amacı',
      goalDescription:
        'Yatay, dikey veya çapraz olarak belirlenen sayıda işareti (X veya O) sıralı şekilde yerleştiren oyuncu oyunu kazanır.',
      turns: 'Oyun Sırası',
      turnsDescription:
        'Oyuncular sırayla boş karelere kendi işaretlerini yerleştirirler. X işareti her zaman ilk başlar.',
      winning: 'Kazanma Koşulu',
      winningDescription:
        'Ayarlarda belirlenen sayıda işareti (varsayılan: 3) yan yana, alt alta veya çapraz dizebilen oyuncu kazanır.',
      ai: 'Bilgisayar Modu',
      aiDescription:
        'Bilgisayara karşı oynarken zorluk seviyesini seçebilirsiniz. Zorluk seviyesi arttıkça bilgisayar daha akıllı hamleler yapar.',
    },

    gameHistory: {
      title: 'Oyun Geçmişi',
      wins: 'Kazandı',
      boardSize: 'Tahta Boyutu',
      moves: 'Hamle Sayısı',
      time: 'Süre',
    },
  },

  EN: {
    // General
    back: 'Back',
    points: 'Points',
    loading: 'Loading...',
    error: 'An error occurred',

    // Main Menu
    welcome: {
      title: 'Tic Tac Toe',
      pvp: 'Two Players',
      ai: 'vs Computer',
      rules: 'How to Play',
      settings: 'Settings',
      stats: 'Statistics',
      achievements: 'Achievements',
    },

    // Game
    game: {
      player1: 'Player X',
      player2: 'Player O',
      computer: 'Computer',
      winner: 'Winner',
      draw: 'Draw!',
      nextPlayer: 'Next Player',
      newGame: 'New Game',
      undo: 'Undo',
      points: 'Points',
      timeLeft: 'Time Left',
      difficulty: {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
      },
    },

    // Settings
    settings: {
      title: 'Settings',
      gameSettings: 'Game Settings',
      appearance: 'Appearance',
      boardSize: 'Board Size',
      winCondition: 'Win Condition',
      timeLimit: 'Time Limit',
      allowUndo: 'Allow Undo',
      theme: 'Theme',
      language: 'Language',
      on: 'On',
      off: 'Off',
      seconds: 'seconds',
      difficulty: 'Difficulty',
    },

    // Stats
    stats: {
      title: 'Statistics',
      totalGames: 'Total Games',
      winRate: 'Win Rate',
      bestTime: 'Best Time',
      winStreak: 'Win Streak',
      againstAI: 'vs Computer',
      againstPlayer: 'vs Player',
      details: 'Details',
      noGames: 'No games played yet',
      recentGames: 'Recent Games',
      moves: 'Moves',
    },

    // Achievements
    achievements: {
      title: 'Achievements',
      locked: 'Locked',
      unlocked: 'Unlocked',
      firstWin: {
        title: 'First Victory',
        description: 'Win your first game',
      },
      speedDemon: {
        title: 'Speed Demon',
        description: 'Win a game in under 10 seconds',
      },
      unbeatable: {
        title: 'Unbeatable',
        description: 'Win 5 games in a row',
      },
      aiMaster: {
        title: 'AI Master',
        description: 'Beat the computer on hard difficulty',
      },
      perfectGame: {
        title: 'Perfect Game',
        description: 'Win without using undo',
      },
    },

    // Rules
    rules: {
      title: 'How to Play',
      goal: 'Game Objective',
      goalDescription:
        'The player who places their symbols (X or O) in a row horizontally, vertically, or diagonally wins the game.',
      turns: 'Turn Order',
      turnsDescription:
        'Players take turns placing their symbols in empty squares. X always goes first.',
      winning: 'Winning Condition',
      winningDescription:
        'The player who aligns the set number of symbols (default: 3) horizontally, vertically, or diagonally wins.',
      ai: 'Computer Mode',
      aiDescription:
        'When playing against the computer, you can choose the difficulty level. Higher difficulty means smarter moves.',
    },

    gameHistory: {
      title: 'Game History',
      wins: 'Won',
      boardSize: 'Board Size',
      moves: 'Moves',
      time: 'Time',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && Object.keys(LANGUAGES).includes(saved) ? saved : 'TR';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (key) => {
      try {
        const keys = key.split('.');
        const result = keys.reduce((obj, k) => obj?.[k], LANGUAGES[language]);
        return result || key;
      } catch (error) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
