import React, { useState, useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet/hooks';

import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import StraightenIcon from '@mui/icons-material/Straighten';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsOffIcon from '@mui/icons-material/GpsOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircleMarker, Polyline, useMapEvents } from 'react-leaflet';


const Toolbar = ({ }) => {

  const [userLocation, setUserLocation] = React.useState(false);
  const [watchID, setWatchID] = React.useState('');

  const [measuring, setMeasuring] = React.useState(false);
  const [mouseLocation, setMouseLocation] = React.useState([0,0]);
  const [measureList, setMeasureList] = React.useState([]);
  const [measureDistance, setMeasureDistance] = React.useState(0);

  const map = useMap();

  const handleGPSClick = (e) => {
    if (!userLocation) {
      const successCallback = (position) => { 
        setUserLocation(position);
      };
      const errorCallback = (error) => { };
      setWatchID(navigator.geolocation.watchPosition(successCallback, errorCallback));
    } else {
      setUserLocation(false);
      navigator.geolocation.clearWatch(watchID);
    } 
  }

  const handleMeasureClick = () => {
    if (measuring) {
      setMeasuring(false);
    } else {
      setMeasuring(true);
    }
  }

  const resetMeasure = () => {
    console.log('resetMeasure')
    setMeasureDistance(0);
    setMeasureList([]);
  }

  const zoomIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    map.zoomIn();
  }

  const zoomOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    map.zoomOut();
  }

  useEffect(() => {
    let distance = 0;
    measureList.map((item, idx) => {
      if (idx > 0) {
        distance += map.distance(measureList[idx-1], measureList[idx]);
      }
    });
    setMeasureDistance(distance);
  }, [measureList]);

  const MeasureLayer = () => {
    const mouseCircle = <CircleMarker center={mouseLocation} color='#fff' radius={6} />
    const map = useMapEvents({
      mousemove(e) {
        setMouseLocation([e.latlng.lat, e.latlng.lng])
      },
      click(e) {
        console.log(e)
        if (e.originalEvent.target.className.includes && e.originalEvent.target.className.includes('leaflet-zoom-animated')) {
          setMeasureList(oldList => [...oldList, [e.latlng.lat, e.latlng.lng]]);
        }
      }
    });
    return (
      <Box display={'flex'} justifyContent={'center'}>
        {mouseCircle}
        {measureList.map((item, idx) => {
          return (
            <>
              <CircleMarker center={item} color='#fff' radius={6} key={idx} />
              {idx > 0 && <Polyline positions={[measureList[idx-1], measureList[idx]]} />}
            </>
          )
        })}
          <Alert
            color='info'
            sx={{position: 'absolute', bottom: 5, zIndex: 500}}
            iconMapping={{
              success: <StraightenIcon />,
            }}
            action={
              <Button color='inherit' size='small' variant='outlined' onClick={resetMeasure}>RESET</Button>
            }
          >
            {(measureDistance/1000).toFixed(2)}km
          </Alert>
      </Box>
    )
  }

  return (
    <>
      <ButtonGroup variant='outlined' orientation='vertical' sx={{position: 'absolute', bottom: 0, left: 0, zIndex: 400, background: (theme) => theme.palette.background.paper, borderRadius: 100, m: 1, py: 0.5 }}>
        <Tooltip placement={'right'} disableInteractive title="Toggle User Location">
          <IconButton size='small' onClick={handleGPSClick}>{userLocation ? <GpsFixedIcon color={'secondary'}  /> : <GpsOffIcon />}</IconButton>
        </Tooltip>
        <Tooltip placement={'right'} disableInteractive title="Toggle Measure Tool">
          <IconButton size='small' onClick={handleMeasureClick}>{measuring ? <StraightenIcon color={'secondary'}/> : <StraightenIcon/>}</IconButton>
        </Tooltip>
        <Tooltip placement={'right'} disableInteractive title="Zoom In">
          <IconButton size='small' onClick={zoomIn} ><AddIcon /></IconButton>
        </Tooltip>
        <Tooltip placement={'right'} disableInteractive title="Zoom Out">
          <IconButton size='small' onClick={zoomOut} ><RemoveIcon /></IconButton>
        </Tooltip>
      </ButtonGroup>
      {userLocation &&
        <CircleMarker center={[userLocation.coords.latitude, userLocation.coords.longitude]} sx={{zIndex: 500}} color={'#fff'} fillColor={'#4c8bf5'} fillOpacity={1} />
      }
      {measuring && <MeasureLayer />}
    </>
  )
}

export default Toolbar;