import React, { useState } from "react";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SignInButton from "./SignInButton";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Container maxWidth="md">
          <SignInButton />
        </Container>
      </Drawer>
    </>
  );
}

export default Sidebar;
