import axios, { AxiosError } from "axios";
import { useAppDispatch } from "../redux/store";
import { setError } from "../redux/reducers/errorReducer";

export default function usePostData() {
  const dispatch = useAppDispatch();
  const postData = async (url: string, input: unknown) => {
    try {
      const response = await axios.post(url, input);
      return response.data;
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data;
      dispatch(setError(`Post data error: ${errorMessage}`));
    }
  };
  return postData;
}
