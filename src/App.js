import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, Polygon, useMapEvents, Polyline, CircleMarker} from 'react-leaflet';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import React, { useState, useEffect } from 'react';

import Public from './components/Public';
import Tracks from './components/Tracks';
import Huts from './components/Huts';
import Hunting from './components/Hunting';
import Menu from './components/Menu';
import InfoCard from './components/InfoCard';

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import zIndex from '@mui/material/styles/zIndex';

const theme = createTheme({
  palette: {
    primary: {
      main: '#156064',
      contrastText: '#fff',
      icon: '#fff'
    },
    secondary: {
      main: '#EE6352',
      contrastText: '#fff'
    },
    info: {
      main: '#fff'
    },
    warning: {
      main: '#ccc'
    },
    background: {
      paper: '#1E1E1E',
    }
  },
  typography: {
    fontFamily: [
      'Lato',
      'Roboto'
    ].join(','),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#156064'
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#ccc',
          "&.Mui-selected": {
            color: "#fff",
            // backgroundColor: '#0e3d40'
          },
        }
      }
    }
  },
});

function App() {
  const LINZTOKEN = "56db51a141764e94b53dfd65c78a2f99";
  const LINZ50URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png";
  const LINZ250URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png";
  const LINZSATURL = "https://tiles-cdn.koordinates.com/services;key="  + LINZTOKEN + "/tiles/v4/layer=109401/EPSG:3857/{z}/{x}/{y}.png";
  const HUNTINGCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Recreational_Hunting_Permit_Areas/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const PUBLICCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  // const ALLTRACKSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultType=standard";
  const TRACKSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Walking_Experiences/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultType=standard";
  const HUTSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const GOOGLESATURL = "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}";

  const [baseMap, setBaseMap] = useState(LINZ250URL);
  const [huntingCoords, setHuntingCoords] = useState([]);
  const [publicCoords, setPublicCoords] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [huts, setHuts] = useState([]);

  const [mapLayers, setMapLayers] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [showInfoCard, setShowInfoCard] = React.useState(true);

  const retrieveData = () => {
    fetch(HUNTINGCOORDSURL).then(res => res.json()).then(
      res => { 
        setHuntingCoords(res.features); 
        fetch(PUBLICCOORDSURL).then(res => res.json()).then(
          res => { 
            setPublicCoords(res.features); 
            fetch(TRACKSURL).then(res => res.json()).then(
              res => { 
                setTracks(res.features); 
                fetch(HUTSURL).then(res => res.json()).then(
                  res => { 
                    setHuts(res.features); 
                    setLoading(false);
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  useEffect(() => {
    console.log("retrieving tracks...")
    retrieveData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Menu mapLayers={mapLayers} setMapLayers={setMapLayers} />
      { loading && 
        <LinearProgress 
          aria-busy={true} 
          color={'primary'} 
          sx={{zIndex: 5000, position: 'absolute', bottom: 0, width: '100%' }}
        /> }
      <InfoCard selectedItem={selectedItem} showInfoCard={showInfoCard} setShowInfoCard={setShowInfoCard} />
      <MapContainer 
        center={[-37.7833, 175.2833]}
        zoom={8}
        scrollWheelZoom={true}
        preferCanvas={true}
        zoomControl={false}
        > 
        <TileLayer url={GOOGLESATURL} /> 
        <LayersControl position="topright">
          <LayersControl.Overlay name="TOPO50" checked={mapLayers.includes("topo50")}>
            <TileLayer url={LINZ50URL} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hunting Areas" checked={mapLayers.includes("hunting")}>
            <Hunting huntingCoords={huntingCoords}  setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Public Land" checked={mapLayers.includes("public")}>
            <Public publicCoords={publicCoords} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Tracks" checked={mapLayers.includes("tracks")}>
            <Tracks tracks={tracks} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Huts" checked={mapLayers.includes("huts")}>
            <Huts huts={huts} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </ThemeProvider>
  );
}

export default App;
