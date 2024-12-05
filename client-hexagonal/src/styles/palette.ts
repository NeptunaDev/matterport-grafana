import { PaletteOptions } from "@mui/material";

export const colors = {
  primary: "#003f63",
  secondary: "#9ed748",
  background: "#121212",
  paper: "#fff",
  text: "#f1f1f1",
  textSecondary: "#e0e0e0",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
}
// Azul Oscuro (#003f63): Para encabezados, gráficos o elementos destacados.
// Azul Medio (#00679f): Para fondos o áreas que requieran contraste con el texto.
// Azul Claro (#00a0d7): Para botones, íconos interactivos o detalles destacados.
// Blanco (#ffffff): Para texto y fondos de alto contraste.
// Gris Claro (#f5f5f5): Para fondos secundarios, divisores o secciones menos relevantes.

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