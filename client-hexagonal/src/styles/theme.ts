import { createTheme } from "@mui/material";
import { typography } from "./typography";
import { colors, palette } from "./palette";

export const theme = createTheme({
  typography: {
    ...typography,
  },
  palette: {
    ...palette,
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.primary,
        },
      },
    },
  },
});
