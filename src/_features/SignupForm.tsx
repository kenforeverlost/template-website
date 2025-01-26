"use client";

import { useState } from "react";
import {
  AlertColor,
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material/";

import CustomAlert from "@components/CustomAlert";
import { createUser } from "@lib/authActions";
import { validateEmail, validatePassword } from "@lib/authHelpers";

export default function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{
    color: AlertColor;
    message: string;
  }>();

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAlertMessage(undefined);
    setProcessing(true);

    let isValid = true;

    try {
      if (!email || email.length === 0) {
        setEmailError("Email is required");
        isValid = false;
      } else {
        const { result: validEmail, message: validEmailMessage } =
          validateEmail(email);
        if (!validEmail) {
          setEmailError(validEmailMessage);
          isValid = false;
        }
      }

      if (!password || password.length === 0) {
        setPasswordError("Password is required");
        isValid = false;
      } else {
        const { result: validPassword, message: validPasswordMessage } =
          validatePassword(password, "signup");
        if (!validPassword) {
          setPasswordError(validPasswordMessage);
          isValid = false;
        }
      }

      if (!confirmPassword || confirmPassword !== password) {
        setConfirmPasswordError("Does not match password");
        isValid = false;
      }

      if (isValid) {
        const { result: userCreated, message: userCreatedMessage } =
          await createUser({ email: email, password: password });
        setAlertMessage({
          color: userCreated ? "success" : "error",
          message: userCreatedMessage,
        });

        if (userCreated) {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      }

      setProcessing(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && error?.message !== ""
          ? error.message
          : "An error occurred during sign up";
      setAlertMessage({ color: "error", message: errorMessage });
    }
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <FormControl onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign Up
          </Typography>
          <Stack>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              key="email"
              autoComplete="email"
              name="email"
              fullWidth
              autoFocus
              id="email"
              placeholder="Email"
              error={!!emailError}
              helperText={emailError}
              color={!!emailError ? "error" : "primary"}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const eventTarget = e.target as HTMLInputElement;

                setEmail(eventTarget.value);
              }}
            />
          </Stack>
          <Stack>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              key="password"
              autoComplete="password"
              name="password"
              fullWidth
              id="password"
              placeholder="••••••••"
              type="password"
              error={!!passwordError}
              helperText={passwordError}
              color={!!passwordError ? "error" : "primary"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const eventTarget = e.target as HTMLInputElement;

                setPassword(eventTarget.value);
              }}
            />
          </Stack>
          <Stack>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <TextField
              key="confirm-password"
              name="confirmPassword"
              fullWidth
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              color={!!confirmPasswordError ? "error" : "primary"}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const eventTarget = e.target as HTMLInputElement;

                setConfirmPassword(eventTarget.value);
              }}
            />
          </Stack>
          <Button
            disabled={processing}
            fullWidth
            variant="contained"
            type="submit"
          >
            Create Account
          </Button>
          {alertMessage && (
            <CustomAlert color={alertMessage.color}>
              {alertMessage.message}
            </CustomAlert>
          )}
        </Box>
      </FormControl>
    </Stack>
  );
}
