import { Box, Card, CardHeader, Container, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RegistrationForm from "../forms/RegistrationForm";
import { page_wrapper } from "../styles/app";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Container sx={{ ...page_wrapper, height: "100%", width: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            width: "100%",
            alignItems: "center",
          }}
        >
          <CardHeader
            avatar={
              <HowToRegIcon color="primary" sx={{ fontSize: "3.5rem" }} />
            }
            title={
              <Typography variant="h5" color="primary.light">
                Register
              </Typography>
            }
          />
          <RegistrationForm />
          <Link to="/login" style={{ marginTop: "2vh" }}>
            Click here if you already have an account!
          </Link>
        </Card>
      </Box>
    </Container>
  );
}
