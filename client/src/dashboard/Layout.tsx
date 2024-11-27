import { ReactNode } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import Sidebar from "../components/SideBar";
import { usePlantManager } from "../hooks/usePlantManager";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  usePlantManager();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background:
            "linear-gradient(90deg, #0ea77b 0%, #9ed748 100%) !important",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Promigas Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        <Container maxWidth={false} sx={{ my: 4, px: 0, height: "100%" }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
