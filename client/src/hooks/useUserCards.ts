import { useFetchUserCardsQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setLoading } from "../redux/reducers/cardReducer";

export default function useUserCards(id: string) {
  const { data: cards, isLoading } = useFetchUserCardsQuery(id);
  const dispatch = useAppDispatch();
  dispatch(setLoading(isLoading))
  return cards
}
