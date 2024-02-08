import { Container } from "@mui/material";
import Bar from "../components/Bar";
import { useFetchCardsPublicCategoriesQuery } from "../redux/api/appApi";
import CategoriesGrid from "../components/CategoriesGrid";
import InitializeGameButton from "../components/InitializeGameButton";
import { page_wrapper } from "../styles/app";

export default function Dashboard() {
  const { data } = useFetchCardsPublicCategoriesQuery(null);

  return (
    <Container sx={page_wrapper}>
      <Bar />
      {data && <CategoriesGrid categories={data} />}
      <InitializeGameButton />
    </Container>
  );
}
