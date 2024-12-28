"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const NavigationList = () => {
    const routeList = [
      { name: "Home", icon: <HomeIcon />, onClick: () => router.push("/") }
    ];
    const userList = [
      {
        name: "Login",
        icon: <LoginIcon />,
        onClick: () => {
          router.push("/login");
        }
      }
    ];

    return (
      <Box sx={{ minWidth: 250 }}>
        <List>
          {routeList.map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {userList.length > 0 && (
            <>
              <Divider />
              {userList.map((item, index) => (
                <ListItem key={index} onClick={item.onClick}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
    );
  };

  return (
    <Stack>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            kdlp.dev
          </Typography>
        </Toolbar>
        <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <NavigationList />
        </Drawer>
      </AppBar>
    </Stack>
  );
}
