import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD_SIZE':
      return {
        ...state,
        settings: {
          ...state.settings,
          boardSize: action.payload,
        },
      };
    case 'SET_WIN_CONDITION':
      return {
        ...state,
        settings: {
          ...state.settings,
          winCondition: action.payload,
        },
      };
    case 'SET_TIME_LIMIT':
      return {
        ...state,
        settings: {
          ...state.settings,
          timeLimit: action.payload,
        },
      };
    case 'SET_ALLOW_UNDO':
      return {
        ...state,
        settings: {
          ...state.settings,
          allowUndo: action.payload,
        },
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
        },
      };
    case 'UNLOCK_ACHIEVEMENT':
      if (state.achievements.has(action.payload)) return state;
      return {
        ...state,
        achievements: new Set([...state.achievements, action.payload]),
      };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        settings: {
          ...state.settings,
          difficulty: action.payload,
        },
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        gameHistory: [action.payload, ...state.gameHistory].slice(0, 10),
      };
    default:
      return state;
  }
};

const initialState = {
  settings: {
    boardSize: 3,
    winCondition: 3,
    timeLimit: 0,
    allowUndo: true,
    difficulty: DIFFICULTY.EASY,
  },
  stats: {
    totalGames: 0,
    winStreak: 0,
    bestTime: null,
    winRatio: {
      player1: 0,
      player2: 0,
      ai: 0,
    },
  },
  achievements: new Set(),
  gameHistory: [],
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
