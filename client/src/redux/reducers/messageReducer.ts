import { SET_MESSAGE, CLEAR_MESSAGE, MessageAction } from "../actions/messageActionType";

export interface MessageState {
    message: string | Element | null;
    openMessage: boolean;
  }
  
  const initialState: MessageState = {
    message: null,
    openMessage: false
  };
  
  export function setMessage(message: string | Element) {
    return {
      type: SET_MESSAGE,
      payload: message,
    };
  }
  
  export function clearMessage() {
    return {
      type: CLEAR_MESSAGE,
    };
  }
  
  export default function messageReducer(
    state = initialState,
    action: MessageAction
  ) {
    switch (action.type) {
      case SET_MESSAGE:
        return {
          ...state,
          message: action.payload,
          openMessage: true
        };
      case CLEAR_MESSAGE:
        return {
          ...state,
          message: null,
          openMessage: false
        };
      default:
          return state;
    }
  }
  
