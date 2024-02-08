import { Button, Container } from "@mui/material";
import { page_wrapper } from "../styles/app";

export default function Home() {
  return (
    <Container sx={page_wrapper}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70vw",
          height: "50vh",
          alignContent: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        <Container sx={{
          display: "flex",
          width: "100%",
          alignContent: 'center',
          justifyContent: 'center',
          gap: 1,
        }}>
          <Button variant="outlined" sx={{width: '45%'}} href="/login">LOGIN</Button>
          <Button variant="outlined" sx={{width: '45%'}} href="/register">REGISTER</Button>
        </Container>
        <Button variant="outlined" sx={{width: '87%', ml: 8.5}} href="/dashboard">EXPLORE</Button>
      </Container>
    </Container>
  );
}
