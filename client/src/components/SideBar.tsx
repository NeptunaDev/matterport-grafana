import { useEffect, useState, ReactElement } from 'react';
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

interface Plant {
 id: string;
 name: string;
 matterportSid: string;
 createdAt: string;
 updatedAt: string;
}

interface MenuItem {
 name: string;
 path: string;
 icon: ReactElement;
}

const drawerWidth = 240;

const Sidebar = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const [plants, setPlants] = useState<MenuItem[]>([]);
 
 useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:8000/plant');
        const data: Plant[] = await response.json();
        
        const plantMenuItems: MenuItem[] = data.map(plant => ({
          name: plant.name.charAt(0).toUpperCase() + plant.name.slice(1),
          path: `/plant/${plant.name}`,
          icon: <FactoryIcon />
        }));
        
        setPlants(plantMenuItems);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
   
    fetchPlants();
   }, []);

 const MENU_ITEMS: MenuItem[] = [
   { 
     name: 'Home',
     path: '/home',
     icon: <HomeIcon />
   },
   ...plants
 ];

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
     <Toolbar>
       "logo"
     </Toolbar>
     <Divider />
     <Box sx={{ overflow: 'auto', flex: 1 }}>
       <List>
         {MENU_ITEMS.map((item) => (
           <ListItem key={item.name} disablePadding>
             <ListItemButton
               selected={location.pathname === item.path}
               onClick={() => navigate(item.path)}
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