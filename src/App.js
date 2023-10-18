import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, LayersControl, useMapEvents } from 'react-leaflet';

import React, { useState, useEffect } from 'react';

import Public from './components/Public';
import Tracks from './components/Tracks';
import Huts from './components/Huts';
import Hunting from './components/Hunting';
import Menu from './components/Menu';
import InfoCard from './components/InfoCard';
import Toolbar from './components/Toolbar';
import LoadAlert from './components/LoadAlert';

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' // light mode
      ? {
          primary: {
            main: '#156064',
            contrastText: '#fff',
          },
          secondary: {
            main: '#EE6352',
          },
          background: {
            paper: '#eee'
          }
        }
      : { // dark mode
        primary: {
          main: '#121212',
          contrastText: '#fff',
        },
        secondary: {
          main: '#EE6352',
        },
    }),
  },
  typography: {
    fontFamily: [
      'Lato',
      'Roboto'
    ].join(','),
  },
});

function App() {
  const LINZTOKEN = "56db51a141764e94b53dfd65c78a2f99";
  const LINZ50URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png";
  const LINZ250URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png";
  const LINZSATURL = "https://tiles-cdn.koordinates.com/services;key="  + LINZTOKEN + "/tiles/v4/layer=109401/EPSG:3857/{z}/{x}/{y}.png";
  const HUNTINGCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Recreational_Hunting_Permit_Areas/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const PUBLICCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultType=standard";
  const TRACKSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Walking_Experiences/FeatureServer/1/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultType=standard";
  const HUTSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const GOOGLESATURL = "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}";

  const [currentTopo, setCurrentTopo] = useState(LINZ250URL);
  const [huntingCoords, setHuntingCoords] = useState([]);
  const [publicCoords, setPublicCoords] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [huts, setHuts] = useState([]);

  const [mapLayers, setMapLayers] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [topoOpacity, setTopoOpacity] = React.useState(1);

  const [loading, setLoading] = React.useState(true);
  const [loadState, setLoadState] = React.useState('');
  const [showInfoCard, setShowInfoCard] = React.useState(true);

  const [theme, setTheme] = React.useState('dark');

  const [trackNameFilter, setTrackNameFilter] = React.useState('');
  const [trackDistanceFilter, setTrackDistanceFilter] = React.useState([0,200]);
  const [maxTrackDistance, setMaxTrackDistance] = React.useState(0);
  const [hutNameFilter, setHutNameFilter] = React.useState('');

  const retrieveData = () => {
    setLoadState('Hunting Land Data');
    fetch(HUNTINGCOORDSURL).then(res => res.json()).then(
      res => { 
        setHuntingCoords(res.features); 
        retrievePublicData();
      }
    );
  }
  let publicArray = [];
  let offset = 0;
  const retrievePublicData = () => {
    setLoadState('Public Land Data');
    fetch(PUBLICCOORDSURL + "&resultOffset=" + offset).then(res => res.json()).then(
      res => { 
        publicArray.push(res.features);
        if (res.exceededTransferLimit) {
          offset += 4000;
          retrievePublicData();
        } else {
          setPublicCoords(publicArray);
          setLoadState('DOC Track Data');
          fetch(TRACKSURL).then(res => res.json()).then(
            res => { 
              setMaxTrackDistance(parseInt(Math.max(...res.features.map(n => n.attributes.Shape__Length / 1000))));
              setTracks(res.features); 
              setLoadState('DOC Hut Data');
              fetch(HUTSURL).then(res => res.json()).then(
                res => { 
                  setHuts(res.features); 
                  setLoading(false);
                }
              );
            }
          );
        }
      }
    );
  }

  useEffect(() => {
    console.log("retrieving tracks...")
    retrieveData();
  }, []);

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend() {
        if (map.getZoom() > 12) {
          setCurrentTopo(LINZ50URL);
        } else {
          setCurrentTopo(LINZ250URL);
        }
      },
      mousedown(e) {
        
      }
    });
    return null;
  };

  return (
    <ThemeProvider theme={createTheme(getDesignTokens(theme))}>
      <Menu mapLayers={mapLayers} setMapLayers={setMapLayers} setTheme={setTheme} setTrackNameFilter={setTrackNameFilter} trackDistanceFilter={trackDistanceFilter} setTrackDistanceFilter={setTrackDistanceFilter} maxTrackDistance={maxTrackDistance} setHutNameFilter={setHutNameFilter} topoOpacity={topoOpacity} setTopoOpacity={setTopoOpacity} />
      { loading && 
        <LoadAlert loadState={loadState} />
        }
      <InfoCard selectedItem={selectedItem} showInfoCard={showInfoCard} setShowInfoCard={setShowInfoCard} />
      <MapContainer 
        center={[-37.7833, 175.2833]}
        zoom={8}
        scrollWheelZoom={true}
        preferCanvas={true}
        zoomControl={false}
        > 
        <TileLayer url={GOOGLESATURL} /> 
        <LayersControl>
          <LayersControl.Overlay name="TOPO50" checked={mapLayers.includes("topo50")}>
            <TileLayer url={currentTopo} opacity={topoOpacity} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hunting Areas" checked={mapLayers.includes("hunting")}>
            <Hunting huntingCoords={huntingCoords}  setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Public Land" checked={mapLayers.includes("public")}>
            <Public publicCoords={publicCoords} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Tracks" checked={mapLayers.includes("tracks")}>
            <Tracks tracks={tracks} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} trackNameFilter={trackNameFilter} trackDistanceFilter={trackDistanceFilter} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Huts" checked={mapLayers.includes("huts")}>
            <Huts huts={huts} setSelectedItem={setSelectedItem} setShowInfoCard={setShowInfoCard} hutNameFilter={hutNameFilter}/>
          </LayersControl.Overlay>
        </LayersControl>
        <MapEvents />
        <Toolbar />
      </MapContainer>
    </ThemeProvider>
  );
}

export default App;
