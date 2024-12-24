import { Stack, Typography } from "@mui/material";
import Content from "@features/Content";
import Header from "@features/Header";
import Footer from "@features/Footer";

export default function Main() {
  return (
    <Stack flexDirection={"column"} sx={{ minHeight: "100vh", width: "100%" }}>
      <Header />
      <Content>
        <Stack flexDirection={"column"} gap={2}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ textAlign: "center" }}
          >
            Hello World
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            We are under construction :)
          </Typography>
        </Stack>
      </Content>
      <Footer />
    </Stack>
  );
}
