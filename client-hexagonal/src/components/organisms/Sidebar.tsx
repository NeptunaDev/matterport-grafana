import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { ChevronLeft, Inbox, Mail } from "@mui/icons-material";

const drawerWidth = 240;

interface SidebarProps {
  handleDrawerClose: () => void;
  open: boolean;
}

export function Sidebar({ handleDrawerClose, open }: SidebarProps) {
  return (
    <Stack sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Stack alignItems={"flex-end"} padding={1} justifyContent={"center"}>
          <IconButton onClick={handleDrawerClose} sx={{
            '&.MuiTouchRipple-root': {
              display: "none",
              position: 'relative'
            }
          }}>
            <ChevronLeft sx={{ color: "primary.main" }} />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Stack>
  );
}
