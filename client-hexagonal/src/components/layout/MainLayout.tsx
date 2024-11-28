import { Stack, styled } from "@mui/material";
import Topbar from "../organisms/Topbar";
import { Sidebar } from "../organisms/Sidebar";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface MainLayoutProps {
  children: JSX.Element;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Stack>
      <Topbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Stack>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Main open={open}>{children}</Main>
      </Stack>
    </Stack>
  );
}
