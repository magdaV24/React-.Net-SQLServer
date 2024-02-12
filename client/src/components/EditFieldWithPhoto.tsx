import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useAppDispatch } from "../redux/store";
import {
  appApi,
  useAddPhotoMutation,
  useChangePhotoMutation,
  useDeletePhotoMutation,
  useEditFieldMutation,
} from "../redux/api/appApi";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublishSharpIcon from "@mui/icons-material/PublishSharp";
import { cloudinaryFnc } from "../utils/cloudinaryFnc";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import useCloudinary from "../hooks/useCloudinaryMutation";
import { setError } from "../redux/reducers/errorReducer";
import { PRESET } from "../utils/cloudinary";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface EditField {
  field: string;
  fieldValue: string;
  photo: string;
  photoField: string;
  cardId: number;
  fieldName: string; // For the typography
}
export default function EditFieldWithPhoto({
  field,
  cardId,
  fieldName,
  photo,
  photoField,
  fieldValue,
}: EditField) {
  const cld = cloudinaryFnc();
  // Getting the mutations
  const [editField, { isLoading }] = useEditFieldMutation();
  const [changePhoto, { isLoading: photoLoading }] = useChangePhotoMutation();
  const [addPhoto, { isLoading: addLoading }] = useAddPhotoMutation();
  const [deletePhoto, { isLoading: deleteLoading }] = useDeletePhotoMutation();

  // Getting what is needed from the Redux Store
  const dispatch = useAppDispatch();

  // Using React Hook Form
  const { control, getValues, setValue, handleSubmit } = useForm();
  const submitEditField = () => {
    const input = { id: cardId, field: field, value: getValues(`${field}`) };
    editField(input);
    dispatch(appApi.util.invalidateTags(["Card"]));
  };
  const submit_to_cloudinary = useCloudinary();

  const submitPhoto = async (field: string) => {
    const temp = getValues(field);
    if (temp === undefined) {
      return;
    }
    const formData = new FormData();

    formData.append("file", temp[0]);
    formData.append("upload_preset", PRESET);

    try {
      await submit_to_cloudinary(formData).then((res) => setValue(field, res));
    } catch (error) {
      dispatch(setError(`Error submitting ${field}: ${error}`));
    }
  };
  const submitChangePhoto = async () => {
    await submitPhoto("changePhoto");
    const input = {
      id: cardId,
      field: photoField,
      oldPublicId: photo,
      newPublicId: getValues("changePhoto"),
    };
    try {
      await changePhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to change the photo: ${error}`));
    }
  };

  const submitAddPhoto = async () => {
    await submitPhoto("addPhoto");
    const input = {
      id: cardId,
      field: photoField,
      publicId: getValues("addPhoto"),
    };
    try {
      await addPhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to add the photo: ${error}`));
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const input = {
        id: cardId,
        field: photoField,
        publicId: photo,
      };
      await deletePhoto(input);
      dispatch(appApi.util.invalidateTags(["Card"]));
    } catch (error) {
      dispatch(setError(`Error while trying to delete the photo: ${error}`));
    }
  };
  return (
    <Box
      sx={{
        width: "40vw",
        backgroundColor: "background.paper",
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography sx={{ pb: 1, pt: 1 }}>Edit {fieldName}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
              <TextField
                sx={{ width: "90%", backgroundColor: "secondary.main" }}
                autoFocus
                {...field}
                defaultValue={fieldValue}
                onChange={(e) => setValue(fieldName, e.target.value)}
              />
            )}
          />

          {isLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit(() => submitEditField())}
              sx={{ height: "7vh" }}
            >
              <PublishSharpIcon />
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {photo.trim() === "" ? (
            <>
              <Controller
                name="addPhoto"
                control={control}
                render={({ field }) => (
                  <Button
                    component="label"
                    variant="contained"
                    color="info"
                    size="large"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                  >
                    Add Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </Button>
                )}
              />
              {addLoading ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit(() => submitAddPhoto())}
                  sx={{ height: "5vh" }}
                >
                  <PublishSharpIcon />
                </Button>
              )}
            </>
          ) : (
            <>
              <Controller
                name="changePhoto"
                control={control}
                render={({ field }) => (
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    color="info"
                    size="large"
                  >
                    Change Photo
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </Button>
                )}
              />
              {photoLoading ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit(() => submitChangePhoto())}
                  sx={{ height: "7vh" }}
                >
                  <PublishSharpIcon />
                </Button>
              )}
            </>
          )}
          {deleteLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Button
              color="warning"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleDeletePhoto}
            >
              DELETE PHOTO
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        {photo.trim() !== "" && (
          <AdvancedImage cldImg={cld.image(photo).resize(fill().height(150))} />
        )}
      </Box>
    </Box>
  );
}
