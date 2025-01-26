"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { AlertColor, Button, Card, Stack, Typography } from "@mui/material";
import { User } from "@supabase/supabase-js";

import Content from "@features/Content";
import Header from "@features/Header";
import Footer from "@features/Footer";

import CustomAlert from "@components/CustomAlert";
import { getSessionUser, logoutUser } from "@lib/authActions";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [alertMessage, setAlertMessage] = useState<{
    color: AlertColor;
    message: string;
  }>();

  const getUserData = async () => {
    const { result, message, data } = await getSessionUser();

    if (!result) {
      setAlertMessage({ color: "error", message });
    } else {
      setUser(data);
    }
  };

  const handleClick = async () => {
    const { result: isLoggedOut, message: isLoggedOutMessage } =
      await logoutUser();

    if (isLoggedOut) {
      redirect("/");
    } else {
      setAlertMessage({ color: "error", message: isLoggedOutMessage });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Stack flexDirection={"column"} sx={{ minHeight: "100vh", width: "100%" }}>
      <Header />
      <Content>
        <Card sx={{ padding: 5, width: "100%" }}>
          <Stack direction={"column"} spacing={5} alignItems={"center"}>
            <Stack sx={{ width: "100%" }}>
              <Typography variant="h4" fontWeight={"bold"}>
                Account Page
              </Typography>
              <Typography>We are under construction :)</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              {!user ? (
                <CustomAlert color={"warning"}>
                  Getting user data...
                </CustomAlert>
              ) : alertMessage ? (
                <CustomAlert color={alertMessage.color}>
                  {alertMessage.message}
                </CustomAlert>
              ) : (
                <CustomAlert color={"success"}>
                  Your email is {user?.email}
                </CustomAlert>
              )}
            </Stack>
            <Stack sx={{ maxWidth: "300px", width: "100%" }}>
              <Button
                onClick={() => {
                  handleClick();
                }}
                variant="contained"
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Content>
      <Footer />
    </Stack>
  );
}
