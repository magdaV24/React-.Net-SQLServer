export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"

export type SetMessage={
    type: typeof SET_MESSAGE;
    payload: string;
}

export type ClearMessage={
    type: typeof CLEAR_MESSAGE
}

export type MessageAction = SetMessage | ClearMessage