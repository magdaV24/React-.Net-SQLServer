import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import LoginForm from "../forms/LoginForm";
import { Container, Card, CardHeader, Typography, Box } from "@mui/material";
import { page_wrapper } from "../styles/app";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container sx={page_wrapper} >
      <Box sx={{ height: "50vh", width: "30vw", display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center'}}>
        <Card
          sx={{ display: "flex", flexDirection: "column", p: 2, width: "30vw", alignItems: 'center' }}
        >
          <CardHeader
            avatar={
              <LoginSharpIcon color="primary" sx={{ fontSize: "3.5rem" }} />
            }
            title={
              <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
                Login
              </Typography>
            }
          />
          <LoginForm />
          <Link to='/register' style={{marginTop: '2vh'}}>Don't have an account? Click here!</Link>
        </Card>
      </Box>
    </Container>
  );
}
