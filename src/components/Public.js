import React, { useState } from 'react'
import { Polygon, LayerGroup } from 'react-leaflet';

const Public = ({ publicCoords }) => {
  return (
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
      })}
    </LayerGroup>
  )
}

export default Public;