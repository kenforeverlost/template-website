"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    //TODO: Add number, case, and special character requirement

    if (confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError("Passwords does not match.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!username || username.length < 1) {
      setUsernameError("Username is required.");
      isValid = false;
    } else {
      setUsernameError("");
    }
    //TODO: Check uniqueness and length

    console.log(isValid);

    if (!isValid) {
      //TODO
      return;
    }

    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    console.log(data);
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <FormControl>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              key="username"
              autoComplete="username"
              name="username"
              fullWidth
              autoFocus
              id="username"
              placeholder="Username or Email"
              error={!!usernameError}
              helperText={usernameError}
              color={!!usernameError ? "error" : "primary"}
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const eventTarget = e.target as HTMLInputElement;

                setUsername(eventTarget.value);
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
          <Button type="submit" fullWidth variant="contained">
            Create Account
          </Button>
        </Box>
      </FormControl>
    </Stack>
  );
}
