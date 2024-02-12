import { Box, Modal } from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import EditFieldWithPhoto from "../components/EditFieldWithPhoto";
import EditField from "../components/EditField";
import { setEdit } from "../redux/reducers/cardReducer";
import EditPublic from "../components/EditPublic";
import { modal } from "../styles/app";

export default function EditCardForm() {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state: RootState) => state.cardReducer.card);
  const isEditing = useAppSelector(
    (state: RootState) => state.cardReducer.isEditing
  );

  return (
    <Modal open={isEditing} onClose={() => dispatch(setEdit(false))} sx={modal}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          minWidth: "60vw",
          width: "fit-content",
          minHeight: "80vh",
          height: "fit-content",
          p: 2,
          mt: 5,
          gap: 2
        }}
      >
        <EditField
          fieldValue={card!.category}
          cardId={card!.id}
          fieldName={"Category"}
        />
        <EditField
          fieldName={"Question"}
          cardId={card!.id}
          fieldValue={"Question"}
        />
        <EditFieldWithPhoto
          field={"Answer"}
          fieldValue={card!.answer}
          photo={card!.answerPhoto}
          photoField={"AnswerPhoto"}
          cardId={card!.id}
          fieldName={"Answer"}
        />
        <EditFieldWithPhoto
          field={"WrongAnswerOne"}
          fieldValue={card!.wrongAnswerOne}
          photo={card!.wrongAnswerOnePhoto}
          photoField={"WrongAnswerOnePhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer One"}
        />
        <EditFieldWithPhoto
          field={"WrongAnswerTwo"}
          fieldValue={card!.wrongAnswerTwo}
          photo={card!.wrongAnswerTwoPhoto}
          photoField={"WrongAnswerTwoPhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer Two"}
        />
        <EditFieldWithPhoto
          field={"WrongAnswerThree"}
          fieldValue={card!.wrongAnswerThree}
          photo={card!.wrongAnswerThreePhoto}
          photoField={"WrongAnswerThreePhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer Three"}
        />
        <EditPublic cardId={card!.id} value={card!.public} />
      </Box>
    </Modal>
  );
}
