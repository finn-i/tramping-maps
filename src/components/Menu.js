import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import { Divider, Drawer } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import HikingIcon from '@mui/icons-material/Hiking';
import MapIcon from '@mui/icons-material/Map';
import PetsIcon from '@mui/icons-material/Pets';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidth = 280;

const Menu = ({ mapLayers, setMapLayers, setTheme }) => {

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const layerChange = (event, newLayers) => {
    setMapLayers(newLayers);
  };

  const toggleTheme = (e) => {
    if (theme.palette.mode === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <AppBar enableColorOnDark color={'primary'}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            NZ Maps
          </Typography>
          <IconButton
            size='large'
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        variant='persistent'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {width: drawerWidth, display: 'flex', justifyContent: 'flex-start'}
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }} >
          <IconButton
            size='large'
            aria-label='close'
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <ToggleButtonGroup
          value={mapLayers}
          onChange={layerChange}
          aria-label='text formatting'
          orientation='vertical'
        >
          <ToggleButton value='topo50' aria-label='topo50' className='menu-item' >
            <MapIcon color={mapLayers.includes('topo50') ? 'warning' : 'primary.contrastText'}/>
            TOPO50
            <Switch checked={mapLayers.includes('topo50')} color='warning' />
          </ToggleButton>
          <ToggleButton value='tracks' aria-label='tracks' className='menu-item' >
            <HikingIcon color={mapLayers.includes('tracks') ? 'warning' : 'primary.contrastText'}/>
            Tracks
            <Switch checked={mapLayers.includes('tracks')} color='warning' />
          </ToggleButton>
          <ToggleButton value='huts' aria-label='huts' className='menu-item' >
            <HomeIcon color={mapLayers.includes('huts') ? 'warning' : 'primary.contrastText'}/>
            Huts
            <Switch checked={mapLayers.includes('huts')} color='warning' />
          </ToggleButton>
          <ToggleButton value='hunting' aria-label='hunting' className='menu-item' >
            <PetsIcon color={mapLayers.includes('hunting') ? 'warning' : 'primary.contrastText'}/>
            Hunting Areas
            <Switch checked={mapLayers.includes('hunting')} color='warning' />
          </ToggleButton>
          <ToggleButton value='public' aria-label='public' className='menu-item' >
            <PublicIcon color={mapLayers.includes('public') ? 'warning' : 'primary.contrastText'}/>
            Public Land
            <Switch checked={mapLayers.includes('public')} color='warning' />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton sx={{ position: 'absolute', bottom: 5, left: 5 }} onClick={toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Drawer>
    </>
  )
}

export default Menu;