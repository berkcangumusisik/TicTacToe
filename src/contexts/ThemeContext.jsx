import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const THEMES = {
  COSMIC: 'cosmic', // Kozmik mor ve yıldızlı
  CANDY: 'candy', // Şeker pembesi ve pastel
  FOREST: 'forest', // Doğal yeşil tonları
  OCEAN: 'ocean', // Derin deniz mavileri
  SUNSET: 'sunset', // Gün batımı tonları
  NEON: 'neon', // Neon ve siber
  GOLDEN: 'golden', // Altın ve lüks
  AURORA: 'aurora', // Kuzey ışıkları
};

// DaisyUI tema renkleri
const themeColors = {
  cosmic: {
    primary: '20 17 39', // Koyu mor
    secondary: '147 51 234', // Parlak mor
    accent: '255 79 205', // Neon pembe
    light: '226 217 255', // Açık mor
    dark: '13 11 26', // Gece mavisi
  },
  candy: {
    primary: '253 242 248', // Açık pembe
    secondary: '236 72 153', // Şeker pembesi
    accent: '249 168 212', // Pastel pembe
    light: '251 207 232', // Açık şeker pembesi
    dark: '219 39 119', // Koyu pembe
  },
  forest: {
    primary: '20 36 28', // Koyu yeşil
    secondary: '52 211 153', // Zümrüt yeşili
    accent: '250 204 21', // Altın sarısı
    light: '209 250 229', // Açık yeşil
    dark: '6 78 59', // Orman yeşili
  },
  ocean: {
    primary: '15 23 42', // Gece mavisi
    secondary: '56 189 248', // Okyanus mavisi
    accent: '34 211 238', // Turkuaz
    light: '186 230 253', // Açık mavi
    dark: '12 74 110', // Derin mavi
  },
  sunset: {
    primary: '30 24 35', // Koyu mor
    secondary: '239 68 68', // Gün batımı kırmızısı
    accent: '251 146 60', // Turuncu
    light: '254 215 170', // Açık turuncu
    dark: '153 27 27', // Koyu kırmızı
  },
  neon: {
    primary: '10 10 10', // Siyah
    secondary: '0 255 159', // Neon yeşil
    accent: '255 0 255', // Neon pembe
    light: '180 255 217', // Açık neon
    dark: '0 0 0', // Siyah
  },
  golden: {
    primary: '28 25 23', // Koyu kahve
    secondary: '234 179 8', // Altın
    accent: '161 98 7', // Bronz
    light: '254 243 199', // Açık altın
    dark: '120 53 15', // Koyu bronz
  },
  aurora: {
    primary: '17 24 39', // Gece mavisi
    secondary: '139 92 246', // Mor
    accent: '52 211 153', // Yeşil
    light: '199 210 254', // Açık mor
    dark: '30 58 138', // Koyu mavi
  },
};

// CSS değişkenlerini oluştur
const createCssVariables = (colors) => {
  return {
    '--game-primary': colors.primary,
    '--game-secondary': colors.secondary,
    '--game-accent': colors.accent,
    '--game-light': colors.light,
    '--game-dark': colors.dark,
  };
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && Object.values(THEMES).includes(saved)
      ? saved
      : THEMES.COSMIC;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Tema renklerini CSS değişkenlerine ata
    const cssVars = createCssVariables(themeColors[theme.toLowerCase()]);
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
