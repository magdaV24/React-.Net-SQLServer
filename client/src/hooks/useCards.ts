import { useEffect } from "react";
import { useFetchGameCardsQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setCards, setLoading } from "../redux/reducers/cardReducer";

export default function useCards(category: string, limit: number) {
  const { data, isLoading } = useFetchGameCardsQuery({
    category,
    limit,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCards(data));
    dispatch(setLoading(isLoading));
  }, [data, dispatch, isLoading]);
  if (category === null && limit === 0) {
    return;
  }
  return data;
}
