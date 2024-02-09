import { Box, Container } from "@mui/material";
import { page_wrapper } from "../styles/app";
import Bar from "../components/Bar";
import { RootState, useAppSelector } from "../redux/store";
import { Card } from "../types/CardType";
import EditCardForm from "../forms/EditCardForm";
import useUserCards from "../hooks/useUserCards";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [id, setId] = useState("");
  const user = useAppSelector((state: RootState) => state.userReducer.user);
  const userId = user?.id;
  const cards = useUserCards(id!);
  const navigate = useNavigate();
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (user) {
      setId(userId!);
    }  else {
        timeout = setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    
      return () => {
        clearTimeout(timeout); 
      };
  }, [navigate, user, userId]);
  return (
    <Container sx={page_wrapper}>
      <Bar />
      <Box sx={{display: 'flex', flexDirection:'column', gap: 2, mt: 10}}>
      {cards &&
        cards.map((card: Card) => <EditCardForm card={card} key={card.id} />)}
      </Box>
    </Container>
  );
}
