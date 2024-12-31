import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function Main({ children }) {
  const { isDark } = useTheme();
  return (
    <Box
      sx={{
        minHeight: "85vh",
        color: isDark ? "#fff" : "#000",
        mt: "90px"
      }}
    >
      {children}
    </Box>
  );
}
