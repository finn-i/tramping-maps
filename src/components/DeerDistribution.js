import React, { useState, useMemo } from 'react';
import { Polygon, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const DeerDistribution = ({ deerDistribution, mapLayers }) => {

  const map = useMap();
  const lineColor = '#158f8f';
  const hoverColor = '#deffff';

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

  const areas = useMemo(() => {
    return mapLayers.map((species, idx) => {
      return deerDistribution[species]?.map((coords, idx2) => {
        return coords.geometry.rings.map((item, idx3) => (
          <Polygon 
            color={hoverColor} 
            fillColor={lineColor} 
            weight={1} 
            fillOpacity={0.15}
            positions={item.map(point => [point[1], point[0]])} 
            key={`${idx}-${idx2}-${idx3}`}
            eventHandlers={{ mouseover: handleMouseOver, mouseout: handleMouseOut }}
          />
        ));
      }) || [];
    });
  }, [deerDistribution, mapLayers]);

  return (
    <LayerGroup>
      {areas}
    </LayerGroup>
  )
}

export default DeerDistribution;