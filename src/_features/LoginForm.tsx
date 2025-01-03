"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
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

    console.log(username);
    console.log(isValid);

    if (!isValid) {
      //TODO
      return;
    }

    const data = {
      username: username,
      password: password
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
            Sign In
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
          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
        </Box>
      </FormControl>
    </Stack>
  );
}
