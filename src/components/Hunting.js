import React, { useState, useMemo } from 'react';
import { Polygon, LayerGroup } from 'react-leaflet';

const Hunting = ({ huntingCoords, setSelectedItem, setShowInfoCard }) => {

  const onHuntingClick = (hunting) => {
    console.log(hunting)
    setShowInfoCard(true);
    setSelectedItem(hunting);
  }

  const areas = React.useMemo(() => {
    return huntingCoords && huntingCoords.map((coords, idx) => {
      return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
        return <Polygon 
          color={"purple"} 
          weight={2} 
          smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2}
          eventHandlers={{ click: () => onHuntingClick(coords) }}
        />
      })
    });
  }, [huntingCoords]);

  return (
    <LayerGroup>
      {areas}
    </LayerGroup>
  )
}

export default Hunting;