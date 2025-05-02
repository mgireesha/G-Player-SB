import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

const Topbar = () => {
  //const toggleDrawer = useUIStore((state) => state.toggleDrawer);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  const mode = useSelector((state: RootState) => state.theme.mode);
  console.log("mode : ",mode)
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            //onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          G-Player
        </Typography>
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
