import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useRefreshStore } from "../../hooks/useRefreshStore";
import { Refresh } from "@mui/icons-material";

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
        width: `calc(100% - ${drawerWidth + 16}px)`,
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

export default function Topbar({ open }: TopbarProps) {
  const refreshAll = useRefreshStore((state) => state.refreshAll);

  return (
    <AppBar position="sticky" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{color: 'background.paper', fontWeight: 800}}>Progeogas - Estación compresora caracoli</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Tooltip title="Actualizar todas las gráficas">
            <IconButton 
              onClick={refreshAll}
              sx={{ 
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          <Stack
            component="img"
            src="/PROMIGAS-01.png"
            alt="Logo Promigas"
            sx={{
              width: "auto",
              padding: 2,
              maxHeight: "75px",
              objectFit: "contain",
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
