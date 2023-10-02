import React, { useState } from 'react'
import { Polyline, LayerGroup } from 'react-leaflet';

const Tracks = ({ tracks }) => {
  return (
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
      })}
    </LayerGroup>
  )
}

export default Tracks;