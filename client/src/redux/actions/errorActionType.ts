export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export type SetError = {
  type: typeof SET_ERROR;
  payload: string;
};

export type ClearError = {
  type: typeof CLEAR_ERROR;
};

export type ErrorAction = SetError | ClearError;
