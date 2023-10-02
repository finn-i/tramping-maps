import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';


const drawerWidth = 240;

const Menu = ({ mapLayers, setMapLayers }) => {

  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

  return (
    <>
      <AppBar >
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
        variant='persistent'
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {width: drawerWidth, display: 'flex', justifyContent: 'flex-start'}
        }}
      >
        <Box sx={{
          display: 'flex'
        }} >
          <IconButton
            size='large'
            edge='end'
            aria-label='close'
            onClick={toggleDrawer(false)}
            // color={'secondary'}
            sx={{
              color: '#fff'
            }}
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
          <ToggleButton value='topo50' aria-label='topo50'>
            <MapIcon color='secondary'/>
            TOPO50
          </ToggleButton>
          <ToggleButton value='tracks' aria-label='tracks'>
            <HikingIcon color='secondary'/>
            Tracks
          </ToggleButton>
          <ToggleButton value='huts' aria-label='huts'>
            <HomeIcon color='secondary'/>
            Huts
          </ToggleButton>
          <ToggleButton value='hunting' aria-label='hunting'>
            <PetsIcon color='secondary'/>
            Hunting Areas
          </ToggleButton>
          <ToggleButton value='public' aria-label='public'>
            <PublicIcon color='secondary'/>
            Public Land
          </ToggleButton>
        </ToggleButtonGroup>

      </Drawer>
    </>
  )
}

export default Menu;