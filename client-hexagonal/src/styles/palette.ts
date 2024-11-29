import { PaletteOptions } from "@mui/material";

export const colors = {
  primary: "#0ea77b",
  secondary: "#9ed748",
  background: "#121212",
  paper: "#212121",
  text: "#f1f1f1",
  textSecondary: "#e0e0e0",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
}

export const palette: PaletteOptions = {
  primary: {
    main: colors.primary,
  },
  secondary: {
    main: colors.secondary,
  },
  background: {
    default: colors.background,
    paper: colors.paper,
  },
  text: {
    primary: colors.text,
    secondary: colors.textSecondary,
  },
  success: {
    main: colors.success,
  },
  warning: {
    main: colors.warning,
  },
  error: {
    main: colors.error,
  },
}