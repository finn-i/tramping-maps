import React, { useState } from 'react';
import { Polygon, LayerGroup } from 'react-leaflet';

const Hunting = ({ huntingCoords }) => {
  return (
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
  )
}

export default Hunting;