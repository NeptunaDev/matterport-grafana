import { ReactElement } from 'react';
import { 
 Drawer, 
 List, 
 ListItem, 
 ListItemButton, 
 ListItemIcon, 
 ListItemText, 
 Toolbar, 
 Divider,
 Box,
} from '@mui/material';
import {
 Home as HomeIcon,
 Factory as FactoryIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlantManager } from '../hooks/usePlantManager';

interface MenuItem {
 name: string;
 path: string;
 icon: ReactElement;
 onClick?: () => void;
}

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plants, setSelectedPlant } = usePlantManager();
  console.log("🚀 ~ Sidebar ~ plants:", plants)
 
  const menuItems: MenuItem[] = [
    { 
      name: 'Home',
      path: '/home',
      icon: <HomeIcon />
    },
    ...plants.map(plant => ({
      name: plant.name.charAt(0).toUpperCase() + plant.name.slice(1),
      path: `/plant/${plant.name.toLowerCase()}`,
      icon: <FactoryIcon />,
      onClick: () => setSelectedPlant(plant.id)
    }))
  ];
 
  const handleNavigation = (path: string, onClick?: () => void) => {
    if (location.pathname !== path) {
      onClick?.();
      navigate(path);
    }
  };
 
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.default',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar>"logo"</Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path, item.onClick)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'inherit' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
 };

export default Sidebar;