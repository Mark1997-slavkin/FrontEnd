import React from "react";
import NavBarLink from "./NavBarLink";
import { Button, Typography } from "@mui/material";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function NavBarItem({ to, sx, label }) {
  const { isDark } = useTheme();

  return (
    <NavBarLink to={to} sx={{ color: isDark ? "white" : "black", ...sx }}>
      <Button color="inherit">
        <Typography>{label}</Typography>
      </Button>
    </NavBarLink>
  );
}
