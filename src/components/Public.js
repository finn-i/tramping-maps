import React, { useState, useMemo } from 'react'
import { Polygon, LayerGroup } from 'react-leaflet';

const Public = ({ publicCoords, setSelectedItem, setShowInfoCard }) => {

  const onPublicClick = (coords) => {
    setShowInfoCard(true);
    setSelectedItem(coords);
  }

  const areas = React.useMemo(() => { 
    return publicCoords && publicCoords.map((coords, idx) => {
      return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
        return <Polygon 
          color={"blue"} 
          weight={2} 
          smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2} 
          eventHandlers={{ 
            click: () => onPublicClick(coords),
          }}
        />
      });
    });
  }, [publicCoords]);

  return (
    <LayerGroup>
      {areas}
    </LayerGroup>
  )
}

export default Public;