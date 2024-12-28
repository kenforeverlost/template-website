import Stack from "@mui/material/Stack";

import Content from "@features/Content";
import Header from "@features/Header";
import Footer from "@features/Footer";
import LoginForm from "@features/LoginForm";

export default function Login() {
  return (
    <Stack flexDirection={"column"} sx={{ minHeight: "100vh", width: "100%" }}>
      <Header />
      <Content>
        <LoginForm />
      </Content>
      <Footer />
    </Stack>
  );
}
