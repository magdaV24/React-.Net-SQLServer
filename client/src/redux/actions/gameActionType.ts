export const INCREMENT_POINTS = "INCREMENT_POINTS";
export const RESET_GAME_STATE = "RESET_GAME_STATE";
export const START_GAME = "START_GAME";
export const INIT_GAME = "INIT_GAME";
export const CLOSE_INIT_GAME = "CLOSE_INIT_GAME";

export type IncrementAction = {
  type: typeof INCREMENT_POINTS;
  payload: number;
};

export type ResetAction = {
  type: typeof RESET_GAME_STATE;
};

export type StartGame = {
  type: typeof START_GAME;
  payload: boolean;
};

export type InitGame = {
  type: typeof INIT_GAME;
  payload: boolean;
};

export type CloseInitGame = {
  type: typeof CLOSE_INIT_GAME;
  payload: boolean;
};

export type GameAction =
  | IncrementAction
  | ResetAction
  | StartGame
  | InitGame
  | CloseInitGame;
