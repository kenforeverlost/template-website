import Stack from "@mui/material/Stack";

import CustomMuiCard from "@components/CustomMuiCard";
import Content from "@features/Content";
import Header from "@features/Header";
import Footer from "@features/Footer";

import { Typography } from "@mui/material";

export default function Account() {
  return (
    <Stack flexDirection={"column"} sx={{ minHeight: "100vh", width: "100%" }}>
      <Header />
      <Content>
        <CustomMuiCard>
          <Typography>Acount Home</Typography>
        </CustomMuiCard>
      </Content>
      <Footer />
    </Stack>
  );
}
