import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
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
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import * as L from "leaflet";

const drawerWidth = 280;

const Menu = ({ myMap, setShowInfoCard, mapLayers, setMapLayers, setTheme, setTrackNameFilter, trackDistanceFilter, setTrackDistanceFilter, maxTrackDistance, setHutNameFilter, topoOpacity, setTopoOpacity, savedItems, setSavedItems, setSelectedItem, loadedLayers }) => {

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [deerOpen, setDeerOpen] = React.useState(false);

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

  const toggleDeerOpen = () => {
    setDeerOpen(!deerOpen);
  }

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
    setShowInfoCard(true);
    if (item.type === 'track') {
      myMap.flyTo(L.latLng(item.data.geometry.paths[0][0][1], item.data.geometry.paths[0][0][0]));
    } else if (item.type === 'hut') {
      myMap.flyTo(L.latLng(item.data.geometry.y, item.data.geometry.x));
    }
    setSelectedItem(item.data);
  };

  return (
    <>
      <AppBar enableColorOnDark sx={{background: '#04151F'}}>
        <Toolbar variant='dense'>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1, fontFamily: 'Antic Slab', userSelect: 'none' }}>
            NZ Outdoor Maps
          {/* <img src='logo.png' width={150} /> */}
          </Typography>
          <Tooltip placement={'left'} disableInteractive title="Open Drawer">
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        variant='persistent'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {width: drawerWidth, display: 'flex', justifyContent: 'flex-start', overflow: 'hidden'}
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }} >
          <Tooltip placement={'left'} disableInteractive title="Close Drawer">
            <IconButton
              size='large'
              aria-label='close'
              onClick={toggleDrawer(false)}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant='h6' sx={{pl:2, fontFamily: 'Antic Slab', userSelect: 'none'}} color={'#999'}>LAYERS</Typography>
        <ToggleButtonGroup
          value={mapLayers}
          onChange={layerChange}
          aria-label='text formatting'
          orientation='vertical'
        >
          <Tooltip placement={'left'} disableInteractive title="Toggle TOPO 250 & 50">
            <ToggleButton value='topo50' aria-label='topo50' className='menu-item' >
              <MapIcon color={mapLayers.includes('topo50') ? 'secondary' : 'primary.contrastText'}/>
              Topographic
              <Switch checked={mapLayers.includes('topo50')} color='secondary' />
            </ToggleButton>
          </Tooltip>
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

          <Tooltip placement={'left'} disableInteractive title="Toggle DOC Tracks">
            <ToggleButton value='tracks' aria-label='tracks' className='menu-item' disabled={!loadedLayers.includes('DOC Track Data')}>
              <HikingIcon color={mapLayers.includes('tracks') ? 'secondary' : 'primary.contrastText'}/>
              Tracks
              <Switch checked={mapLayers.includes('tracks')} color='secondary' />
            </ToggleButton>
          </Tooltip>
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
          <Tooltip placement={'left'} disableInteractive title="Toggle DOC Huts">
            <ToggleButton value='huts' aria-label='huts' className='menu-item' disabled={!loadedLayers.includes('DOC Hut Data')}>
              <HomeIcon color={mapLayers.includes('huts') ? 'secondary' : 'primary.contrastText'}/>
              Huts
              <Switch checked={mapLayers.includes('huts')} color='secondary' />
            </ToggleButton>
          </Tooltip>
          {
            <Collapse in={mapLayers.includes('huts')}>
            <Box sx={{px: 4, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.12)'}}>
              <TextField sx={{paddingBottom: 1}} label='Search Huts' variant='standard' size='small' color='secondary' fullWidth onChange={handleHutNameFilterChange} autoComplete='off'/>
            </Box>
            </Collapse>
          }

          <Tooltip placement={'left'} disableInteractive title="Toggle Designated Hunting Areas">
            <ToggleButton value='hunting' aria-label='hunting' className='menu-item' disabled={!loadedLayers.includes('Hunting Land Data')}>
              <PetsIcon color={mapLayers.includes('hunting') ? 'secondary' : 'primary.contrastText'}/>
              Hunting Areas
              <Switch checked={mapLayers.includes('hunting')} color='secondary' />
            </ToggleButton>
          </Tooltip>

          <Tooltip placement={'left'} disableInteractive title="Toggle Public Land">
            <ToggleButton value='public' aria-label='public' className='menu-item' disabled={!loadedLayers.includes('Public Land Data')}>
              <PublicIcon color={mapLayers.includes('public') ? 'secondary' : 'primary.contrastText'}/>
              Public Land
              <Switch checked={mapLayers.includes('public')} color='secondary' />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Button variant="contained" disableElevation onClick={toggleDeerOpen} endIcon={deerOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} sx={{justifyContent: 'flex-start'}}><Typography variant='h6' sx={{pl:2, pt:2, fontFamily: 'Antic Slab', userSelect: 'none'}} color={'#999'}>DEER DISTRIBUTION</Typography></Button>
        <Collapse in={deerOpen} >
          <ToggleButtonGroup
            value={mapLayers}
            onChange={layerChange}
            aria-label={'text formatting'}
            orientation={'vertical'}
            sx={{width: '100%'}}
          >
            <Tooltip placement={'left'} disableInteractive title="Toggle Red Deer Distribution">
              <ToggleButton value='red' aria-label='red' className='menu-item' disabled={!loadedLayers.includes('red')} >
                Red
                <Switch checked={mapLayers.includes('red')} color='secondary' />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement={'left'} disableInteractive title="Toggle Fallow Deer Distribution">
              <ToggleButton value='fallow' aria-label='fallow' className='menu-item' disabled={!loadedLayers.includes('fallow')} >
                Fallow
                <Switch checked={mapLayers.includes('fallow')} color='secondary' />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement={'left'} disableInteractive title="Toggle Sika Deer Distribution">
              <ToggleButton value='sika' aria-label='sika' className='menu-item' disabled={!loadedLayers.includes('sika')} >
                Sika
                <Switch checked={mapLayers.includes('sika')} color='secondary' />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement={'left'} disableInteractive title="Toggle Rusa Deer Distribution">
              <ToggleButton value='rusa' aria-label='rusa' className='menu-item' disabled={!loadedLayers.includes('rusa')} >
                Rusa
                <Switch checked={mapLayers.includes('rusa')} color='secondary' />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement={'left'} disableInteractive title="Toggle Sambar Deer Distribution">
              <ToggleButton value='sambar' aria-label='sambar' className='menu-item' disabled={!loadedLayers.includes('sambar')} >
                Sambar
                <Switch checked={mapLayers.includes('sambar')} color='secondary' />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement={'left'} disableInteractive title="Toggle White-Tailed Deer Distribution">
              <ToggleButton value='whitetailed' aria-label='whitetailed' className='menu-item' disabled={!loadedLayers.includes('whitetailed')} >
                White-Tailed
                <Switch checked={mapLayers.includes('whitetailed')} color='secondary' />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Collapse>

        {savedItems.length > 0 &&
          <>
            <Typography variant='h6' sx={{pl:2, pt:2, fontFamily: 'Antic Slab', userSelect: 'none'}} color={'#999'}>FAVOURITES</Typography>
            <ToggleButtonGroup sx={{px:2}} orientation='vertical'>
              {savedItems.map((item, idx) => {
                return <ToggleButton className={'fav-item'} sx={{p:0.5, pl: 1.5}} key={idx} onClick={() => handleFavClick(item)} value='public' aria-label='public' >
                    {item.name}
                  </ToggleButton>
              })}
            </ToggleButtonGroup>
          </>
        }
        <Tooltip placement={'left'} disableInteractive title="Toggle Dark Mode">
          <IconButton sx={{ position: 'absolute', bottom: 5, left: 5 }} onClick={toggleTheme} color='inherit'>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Drawer>
    </>
  )
}

export default Menu;