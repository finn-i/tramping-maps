import React, { useState, useMemo } from 'react';
import { Polygon, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const Hunting = ({ huntingCoords, setSelectedItem, setShowInfoCard }) => {

  const map = useMap();
  const lineColor = '#158f8f';
  const hoverColor = '#deffff';

  const onHuntingClick = (hunting) => {
    setShowInfoCard(true);
    setSelectedItem(hunting);
  }

  const handleMouseOver = (e) => {
    e.target.options.fillColor = hoverColor;
    const center = map.getCenter();
    map.panTo(center);
  };
  
  const handleMouseOut = (e) => {
    e.target.options.fillColor = lineColor;
    const center = map.getCenter();
    map.panTo(center);
  };

  const areas = React.useMemo(() => {
    return huntingCoords && huntingCoords.map((coords, idx) => {
      return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
        return <Polygon 
          color={hoverColor} 
          fillColor={lineColor} 
          weight={1} 
          fillOpacity={0.15}
          // smoothFactor={2.0} 
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