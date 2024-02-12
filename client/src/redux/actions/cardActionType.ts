import { Card } from "../../types/CardType";

export const SET_CARDS = "SET_CARDS";
export const SET_CARD = "SET_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const LOADING = "LOADING";
export const SET_LIMIT = "SET_LIMIT";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_COUNT = "SET_COUNT";
export const RESET_CARD_STATE = "RESET_CARD_STATE";

export type SetCard = {
  type: typeof SET_CARD;
  payload: Card;
};

export type EditCard = {
  type: typeof EDIT_CARD;
  payload: boolean;
};

export type SetCards = {
  type: typeof SET_CARDS;
  payload: Card[];
};

export type Loading = {
  type: typeof LOADING;
  payload: boolean;
};

export type SetLimit = {
  type: typeof SET_LIMIT;
  payload: number;
};

export type SetCategory = {
  type: typeof SET_CATEGORY;
  payload: object | undefined;
};

export type SetCount = {
  type: typeof SET_COUNT;
  payload: number;
};

export type ResetCardState = {
  type: typeof RESET_CARD_STATE;
};

export type CardAction =
  | SetCards
  | SetCard
  | EditCard
  | SetLimit
  | SetCategory
  | SetCount
  | Loading
  | ResetCardState;
