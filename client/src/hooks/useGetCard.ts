import { useEffect } from "react";
import { useFetchCardQuery } from "../redux/api/appApi";
import { useAppDispatch } from "../redux/store";
import { setCard, setLoading } from "../redux/reducers/cardReducer";

export default function useGetCard(id: number) {
  const dispatch = useAppDispatch();
    const { data, isLoading } = useFetchCardQuery(id);
    dispatch(setLoading(isLoading));
    useEffect(()=> {
        if(!data){
            return
        }
        dispatch(setCard(data))
    },[data, dispatch])
    return data
}
