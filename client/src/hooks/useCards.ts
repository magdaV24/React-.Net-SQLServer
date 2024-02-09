import { useEffect } from "react";
import { useFetchGameCardsQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setCards } from "../redux/reducers/cardReducer";

export default function useCards(category: string, limit: number) {
  const dispatch = useAppDispatch();
  const { data } = useFetchGameCardsQuery({
    category,
    limit,
  });
  useEffect(() => {
    dispatch(setCards(data));
  }, [data, dispatch]);
  if (category === null && limit === 0) {
    return;
  }
  return data;
}
