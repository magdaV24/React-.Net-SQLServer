import { useFetchGameCategoriesQuery } from "../redux/api/appApi";

export default function useFetchSelect(id: string) {
    const {data} = useFetchGameCategoriesQuery(id);
    return { data }
}
