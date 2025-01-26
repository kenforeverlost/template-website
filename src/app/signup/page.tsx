import Stack from "@mui/material/Stack";

import CustomMuiCard from "@components/CustomMuiCard";
import Content from "@features/Content";
import Header from "@features/Header";
import Footer from "@features/Footer";
import SignupForm from "@features/SignupForm";

export default function Signup() {
  return (
    <Stack flexDirection={"column"} sx={{ minHeight: "100vh", width: "100%" }}>
      <Header />
      <Content>
        <CustomMuiCard>
          <SignupForm />
        </CustomMuiCard>
      </Content>
      <Footer />
    </Stack>
  );
}
