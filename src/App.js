import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, Polygon, useMapEvents, Polyline, CircleMarker} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import React, { useState, useEffect } from 'react';

import Huts from './components/Huts'

function App() {
  const LINZTOKEN = "56db51a141764e94b53dfd65c78a2f99";
  const LINZ50URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png";
  const LINZ250URL = "https://tiles-cdn.koordinates.com/services;key=" + LINZTOKEN + "/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png";
  const LINZSATURL = "https://tiles-cdn.koordinates.com/services;key="  + LINZTOKEN + "/tiles/v4/layer=109401/EPSG:3857/{z}/{x}/{y}.png";
  const HUNTINGCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Recreational_Hunting_Permit_Areas/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const PUBLICCOORDSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const TRACKSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Tracks/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultType=standard";
  const HUTSURL = "https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Huts/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  const GOOGLESATURL = "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}";

  const [baseMap, setBaseMap] = useState(LINZ250URL);
  const [huntingCoords, setHuntingCoords] = useState([]);
  const [publicCoords, setPublicCoords] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [huts, setHuts] = useState([]);

  const retrieveData = () => {
    fetch(HUNTINGCOORDSURL).then(res => res.json()).then(
      res => { setHuntingCoords(res.features); }
    );
    fetch(PUBLICCOORDSURL).then(res => res.json()).then(
      res => { setPublicCoords(res.features); }
    );
    fetch(TRACKSURL).then(res => res.json()).then(
      res => { setTracks(res.features); }
    );
    fetch(HUTSURL).then(res => res.json()).then(
      res => { setHuts(res.features); }
    );
  }

  useEffect(() => {
    console.log("retrieving tracks...")
    retrieveData();
  }, []);

  // const MapEvents = () => {
  //   const map = useMapEvents({
  //     zoomend() {
  //       if (map.getZoom() > 12) {
  //         setBaseMap(LINZ50URL);
  //       } else {
  //         setBaseMap(LINZ250URL);
  //       }
  //     }
  //   });
  //   return null;
  // };

  return (
    <>
      <MapContainer center={[-37.7833, 175.2833]} zoom={8} scrollWheelZoom={true} preferCanvas={true} >
        <TileLayer
          url={GOOGLESATURL}
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="TOPO50">
            <TileLayer
              url={LINZ50URL}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hunting Areas">
            <LayerGroup>
              {huntingCoords && huntingCoords.map((coords, idx) => {
                return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
                  return <Polygon 
                    color={"purple"} 
                    weight={2} 
                    smoothFactor={2.0} 
                    positions={item.map(point => [point[1],point[0]])} 
                    key={idx+idx2}
                  />
                })
              })};
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Public Land">
            <LayerGroup>
              {publicCoords && publicCoords.map((coords, idx) => {
                return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
                  return <Polygon 
                    color={"blue"} 
                    weight={2} 
                    smoothFactor={2.0} 
                    positions={item.map(point => [point[1],point[0]])} 
                    key={idx+idx2} 
                  />
                });
              })};
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Tracks">
            <LayerGroup>
              {tracks && tracks.map((coords, idx) => {
                return coords.geometry.paths && coords.geometry.paths.map((item, idx2) => {
                  return <Polyline 
                    color={"#4c8bf5"} 
                    weight={2} 
                    smoothFactor={2.0} 
                    positions={item.map(point => [point[1],point[0]])} 
                    key={idx+idx2} 
                  />
                });
              })};
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Huts">
            <LayerGroup>
              <MarkerClusterGroup chunkedLoading>
                <Huts huts={huts} />
              </MarkerClusterGroup>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {/* <MapEvents /> */}
      </MapContainer>
    </>
  );
}

export default App;
