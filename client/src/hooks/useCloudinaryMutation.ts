import { useMutation } from "react-query";
import { useState } from "react";
import usePostData from "./usePostData";
import { useAppDispatch } from "../redux/store";
import { setError } from "../redux/reducers/errorReducer";
import { CLOUDINARY } from "../utils/cloudinary";

export const useCloudinaryMutation = () => {
  const postData = usePostData();
  const mutation = useMutation((input: unknown) => postData(CLOUDINARY, input));
  return mutation;
};

export default function useCloudinary() {
  const [, setId] = useState("");
  const mutation = useCloudinaryMutation();

  const dispatch = useAppDispatch();
  const submit_to_cloudinary = async (input: FormData) => {
    try {
      const result = await mutation.mutateAsync(input);
      const publicId = result.public_id;
      setId(publicId);
      return publicId;
    } catch (error) {
      dispatch(setError(`Error while uploading to Cloudinary: ${error}`));
    }
  };
  return submit_to_cloudinary;
}
