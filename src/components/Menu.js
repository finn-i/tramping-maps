import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Collapse from '@mui/material/Collapse';
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
import Stack from '@mui/material/Stack';
import * as L from "leaflet";

const drawerWidth = 280;

const Menu = ({ myMap, mapLayers, setMapLayers, setTheme, setTrackNameFilter, trackDistanceFilter, setTrackDistanceFilter, maxTrackDistance, setHutNameFilter, topoOpacity, setTopoOpacity, savedItems, setSavedItems, setSelectedItem, loadedLayers }) => {

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

  const layerChange = (e, newLayers) => {
    setMapLayers(newLayers);
  };

  const toggleTheme = (e) => {
    if (theme.palette.mode === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const handleTrackNameFilterChange = (e) => {
    setTrackNameFilter(e.target.value);
  };
  
  const handleHutNameFilterChange = (e) => {
    setHutNameFilter(e.target.value);
  };

  const handleDistanceFilterChange = (e, newValue) => {
    setTrackDistanceFilter(newValue);
  };

  const handleTopoOpacityChange = (e, newValue) => {
    setTopoOpacity(newValue);
  };

  const handleFavClick = (item) => {
    if (item.type === 'track') myMap.flyTo(L.latLng(item.data.geometry.paths[0][0][1], item.data.geometry.paths[0][0][0]));
    else if (item.type === 'hut') myMap.flyTo(L.latLng(item.data.geometry.y, item.data.geometry.x));
    setSelectedItem(item.data);
  };

  return (
    <>
      <AppBar enableColorOnDark sx={{background: '#25210F'}}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            NZ Outdoor Maps
          {/* <img src='logo.png' width={150} /> */}
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
          sx: {width: drawerWidth, display: 'flex', justifyContent: 'flex-start', overflow: 'hidden', borderLeft: 0}
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
        <Typography variant='h6' sx={{pl:2}} color={'#999'}>LAYERS</Typography>
        <ToggleButtonGroup
          value={mapLayers}
          onChange={layerChange}
          aria-label='text formatting'
          orientation='vertical'
        >
          <ToggleButton value='topo50' aria-label='topo50' className='menu-item' >
            <MapIcon color={mapLayers.includes('topo50') ? 'secondary' : 'primary.contrastText'}/>
            Topographic
            <Switch checked={mapLayers.includes('topo50')} color='secondary' />
          </ToggleButton>
          <Collapse in={mapLayers.includes('topo50')}>
            <Box sx={{px: 4, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.12)'}}>
              {/* <Typography variant='subtitle1'>Filter</Typography> */}
              <Stack spacing={2} direction='row' alignItems='center'>
                <Typography variant='subtitle1'>Opacity:</Typography>
                <Slider
                  value={topoOpacity}
                  onChange={handleTopoOpacityChange}
                  valueLabelDisplay={'auto'}
                  color={'secondary'}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelFormat={(value)=>{return parseInt(value*100) + '%'}}
                />
              </Stack>
            </Box>
            </Collapse>
          <ToggleButton value='tracks' aria-label='tracks' className='menu-item' disabled={!loadedLayers.includes('DOC Track Data')}>
            <HikingIcon color={mapLayers.includes('tracks') ? 'secondary' : 'primary.contrastText'}/>
            Tracks
            <Switch checked={mapLayers.includes('tracks')} color='secondary' />
          </ToggleButton>
          
          <Collapse in={mapLayers.includes('tracks')}>
            <Box sx={{px: 4, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.12)'}}>
              {/* <Typography variant='subtitle1'>Filter</Typography> */}
              <TextField sx={{paddingBottom: 1}} label='Search Tracks' variant='standard' size='small' color='secondary' fullWidth onChange={handleTrackNameFilterChange} autoComplete='off'/>
              <Stack spacing={2} direction='row' alignItems='center'>
                <Typography variant='subtitle1'>Distance:</Typography>
                <Slider
                  value={trackDistanceFilter}
                  onChange={handleDistanceFilterChange}
                  valueLabelDisplay={'auto'}
                  color={'secondary'}
                  max={maxTrackDistance + 1}
                  min={0}
                  step={1}
                  valueLabelFormat={(value)=>{return value + 'km'}}
                />
              </Stack>
            </Box>
          </Collapse>
          
          <ToggleButton value='huts' aria-label='huts' className='menu-item' disabled={!loadedLayers.includes('DOC Hut Data')}>
            <HomeIcon color={mapLayers.includes('huts') ? 'secondary' : 'primary.contrastText'}/>
            Huts
            <Switch checked={mapLayers.includes('huts')} color='secondary' />
          </ToggleButton>
          {
            <Collapse in={mapLayers.includes('huts')}>
            <Box sx={{px: 4, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.12)'}}>
              {/* <Typography variant='subtitle1'>Filter</Typography> */}
              <TextField sx={{paddingBottom: 1}} label='Search Huts' variant='standard' size='small' color='secondary' fullWidth onChange={handleHutNameFilterChange} autoComplete='off'/>
            </Box>
            </Collapse>
          }
          <ToggleButton value='hunting' aria-label='hunting' className='menu-item' disabled={!loadedLayers.includes('Hunting Land Data')}>
            <PetsIcon color={mapLayers.includes('hunting') ? 'secondary' : 'primary.contrastText'}/>
            Hunting Areas
            <Switch checked={mapLayers.includes('hunting')} color='secondary' />
          </ToggleButton>
          <ToggleButton value='public' aria-label='public' className='menu-item' disabled={!loadedLayers.includes('Public Land Data')}>
            <PublicIcon color={mapLayers.includes('public') ? 'secondary' : 'primary.contrastText'}/>
            Public Land
            <Switch checked={mapLayers.includes('public')} color='secondary' />
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant='h6' sx={{pl:2, pt:2}} color={'#999'}>FAVOURITES</Typography>
        <ToggleButtonGroup sx={{px:2}} orientation='vertical'>
          {savedItems.map((item, idx) => {
            return <ToggleButton className={'fav-item'} sx={{p:0.5}} key={idx} onClick={() => handleFavClick(item)} value='public' aria-label='public' >
                {item.name}
              </ToggleButton>
          })}
        </ToggleButtonGroup>
        <IconButton sx={{ position: 'absolute', bottom: 5, left: 5 }} onClick={toggleTheme} color='inherit'>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Drawer>
    </>
  )
}

export default Menu;