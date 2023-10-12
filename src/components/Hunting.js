import React, { useState, useMemo } from 'react';
import { Polygon, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const Hunting = ({ huntingCoords, setSelectedItem, setShowInfoCard }) => {

  const map = useMap();
  const lineColor = 'purple';
  const hoverColor = '#ffffff';

  const onHuntingClick = (hunting) => {
    setShowInfoCard(true);
    setSelectedItem(hunting);
  }

  const handleMouseOver = (e) => {
    e.target.options.color = hoverColor;
    const center = map.getCenter();
    map.panTo(center);
  };
  
  const handleMouseOut = (e) => {
    e.target.options.color = lineColor;
    const center = map.getCenter();
    map.panTo(center);
  };

  const areas = React.useMemo(() => {
    return huntingCoords && huntingCoords.map((coords, idx) => {
      return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
        return <Polygon 
          color={"purple"} 
          weight={2} 
          smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2}
          eventHandlers={{ click: () => onHuntingClick(coords), mouseover: (e) => handleMouseOver(e), mouseout: (e) => handleMouseOut(e) }}
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