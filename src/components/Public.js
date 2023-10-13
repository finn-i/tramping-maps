import React, { useState, useMemo } from 'react'
import { Polygon, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const Public = ({ publicCoords, setSelectedItem, setShowInfoCard }) => {

  const lineColor = 'MediumSpringGreen';
  const hoverColor = '#ffffff';
  const map = useMap();

  const onPublicClick = (coords) => {
    setShowInfoCard(true);
    setSelectedItem(coords);
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
    return publicCoords && publicCoords.map((coords, idx) => {
      return coords.geometry.rings && coords.geometry.rings.map((item, idx2) => {
        return <Polygon 
          color={lineColor} 
          weight={1} 
          fillOpacity={0.1}
          // smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2} 
          eventHandlers={{ 
            click: () => onPublicClick(coords), mouseover: (e) => handleMouseOver(e), mouseout: (e) => handleMouseOut(e)
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