import { useFetchGameCategoriesQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setLoading } from "../redux/reducers/cardReducer";

export default function useFetchSelect(id: string) {
    const {data, isLoading} = useFetchGameCategoriesQuery(id);
    const dispatch = useAppDispatch();
    dispatch(setLoading(isLoading))

    return { data }
}
