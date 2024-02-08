import { Container } from "@mui/material";
import { page_wrapper } from "../styles/app";
import Bar from "../components/Bar";
import { useFetchUserCardsQuery } from "../redux/api/appApi";
import { RootState, useAppSelector } from "../redux/store";
import { Card } from "../types/CardType";
import EditCardForm from "../forms/EditCardForm";
import Backdrop from "../components/Backdrop";

export default function UserPage() {
    const  user = useAppSelector((state: RootState) => state.userReducer.user)
    const id  = user?.id
    const { data, isLoading } = useFetchUserCardsQuery(id);
    
    return(
        <Container sx={page_wrapper}>
            <Bar/>
            {data && data.map((card: Card) => (
                <EditCardForm card={card} key={card.id}/>
            ))}
            <Backdrop open={isLoading} />
        </Container>
    )
    
}
