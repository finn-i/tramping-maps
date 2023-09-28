import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, Polygon, useMapEvents, Polyline, CircleMarker} from 'react-leaflet';


const Huts = ({ huts }) => {
  return (
    <>
    {huts && huts.map((coords, idx) => {
      return <CircleMarker 
        color={"#FFF"}
        weight={2}
        fillColor={"#4c8bf5"} 
        fillOpacity={1.0}  
        center={[coords.geometry.y, coords.geometry.x]} 
        key={idx} 
        polygonOptions={{
          color: '#4c8bf5',
        }}
      />
    })};
    </>
  )
}

export default Huts;