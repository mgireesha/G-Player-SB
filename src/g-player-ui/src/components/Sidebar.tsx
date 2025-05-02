import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as ArtistIcon,
  Album as AlbumIcon,
  LibraryMusic as GenreIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
//import { useUIStore } from '../store/useUIStore';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Artists', path: '/artists', icon: <ArtistIcon /> },
  { text: 'Albums', path: '/albums', icon: <AlbumIcon /> },
  { text: 'Genres', path: '/genres', icon: <GenreIcon /> },
  { text: 'Languages', path: '/languages', icon: <LanguageIcon /> },
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mobileOpen = false;//useUIStore((state) => state.mobileOpen);
  const closeDrawer = true;//useUIStore((state) => state.closeDrawer);

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {menuItems.map(({ text, path, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path} 
           // onClick={isMobile ? closeDrawer : undefined}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      //onClose={closeDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
