import { Card } from "../../types/CardType";
import { CardAction, LOADING, RESET_CARD_STATE, SET_CARDS, SET_CATEGORY, SET_COUNT, SET_LIMIT } from "../actions/cardActionType";

interface CardState {
  cards: Card[] | null;
  loading: boolean;
  category: string | null;
  limit: number;
  count: number;
}

const initialState: CardState = {
  cards: null,
  loading: false,
  category: null,
  limit: 0,
  count: 0,
};

export function setLoading(loading: boolean){
  return{
    type: LOADING,
    payload: loading
  }
}

export function setCards(cards: Card[]){
  return{
    type: SET_CARDS,
    payload: cards,
  }
}

export function setCategory(category: string){
  return{
    type: SET_CATEGORY,
    payload: category,
  }
}

export function setLimit(limit: number){
  return{
    type: SET_LIMIT,
    payload: limit,
  }
}
export function setCount(count: number){
  return{
    type: SET_COUNT,
    payload: count,
  }
}

export function resetCardState(){
  return{
    type: RESET_CARD_STATE
  }
}

export default function cardReducer(state=initialState, action: CardAction){
  switch(action.type){
    case  SET_CARDS:
      return{
        ...state,
        cards: action.payload
      }
    case SET_LIMIT:
      return{
        ...state,
        limit: action.payload
      }
    case SET_CATEGORY:
      return{
        ...state,
        category: action.payload
      }
    case SET_COUNT:
      return{
        ...state,
        count: action.payload
      }
    case LOADING:
      return{
        ...state,
        loading: action.payload
      }
    case RESET_CARD_STATE:
      return initialState
      default:
        return state;
  }
}
