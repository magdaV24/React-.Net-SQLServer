import {
  CLOSE_INIT_GAME,
  GameAction,
  INCREMENT_POINTS,
  INIT_GAME,
  RESET_GAME_STATE,
  START_GAME,
} from "../actions/gameActionType";

export interface GameState {
  points: number;
  start: boolean;
  gameInit: boolean;
}

const initialState: GameState = {
  points: 0,
  start: false,
  gameInit: false,
};

export function increment(input: number) {
  return {
    type: INCREMENT_POINTS,
    payload: input,
  };
}

export function reset() {
  return {
    type: RESET_GAME_STATE,
  };
}
export function initGame() {
  return {
    type: INIT_GAME,
  };
}

export function closeInitGame() {
  return {
    type: INIT_GAME,
  };
}

export function startGame() {
  return {
    type: START_GAME,
  };
}

export default function gameReducer(state = initialState, action: GameAction) {
  switch (action.type) {
    case INCREMENT_POINTS:
      return {
        ...state,
        points: action.payload + state.points,
      };
    case START_GAME:
      return {
        ...state,
        start: true,
      };
    case INIT_GAME:
      return {
        ...state,
        gameInit: true,
      };
    case CLOSE_INIT_GAME:
      return {
        ...state,
        gameInit: false,
      };
    case RESET_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
