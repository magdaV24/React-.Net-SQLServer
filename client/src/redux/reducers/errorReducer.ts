import {
  CLEAR_ERROR,
  ErrorAction,
  SET_ERROR,
} from "../actions/errorActionType";

export interface ErrorState {
  error: string | null;
  openError: boolean;
}

const initialState: ErrorState = {
  error: null,
  openError: false,
};

export function setError(error: string) {
  return {
    type: SET_ERROR,
    payload: error,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export default function errorReducer(
  state = initialState,
  action: ErrorAction
) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        openError: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        openError: false,
      };
    default:
        return state;
  }
}
