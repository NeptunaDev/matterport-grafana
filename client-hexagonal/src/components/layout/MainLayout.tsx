import { Stack, styled } from "@mui/material";
import Topbar from "../organisms/Topbar";
import { Sidebar } from "../organisms/Sidebar";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  margin: '8px',
  marginTop: '0',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  minHeight: "calc(100vh - 88px)",
  padding: "8px",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth + 8,
      },
    },
  ],
}));

interface MainLayoutProps {
  children: JSX.Element;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Stack>
      <Topbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Stack gap={1}>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Main open={open}>{children}</Main>
      </Stack>
    </Stack>
  );
}
