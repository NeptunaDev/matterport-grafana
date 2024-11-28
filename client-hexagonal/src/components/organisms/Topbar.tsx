import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  margin: "8px",
  marginBottom: "0",
  width: `calc(100% - 16px)`,
  borderRadius: "8px",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth + 8}px)`,
        marginLeft: `${drawerWidth + 8}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface TopbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function Topbar({ open, handleDrawerOpen }: TopbarProps) {
  return (
    <AppBar position="sticky" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[open && { display: "none" }]}
        >
          <MenuIcon sx={{ color: "text.primary" }} />
        </IconButton>
        <Typography variant="h4">Promigas</Typography>
      </Toolbar>
    </AppBar>
  );
}
