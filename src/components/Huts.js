import React, { useState } from 'react'
import { CircleMarker, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useMap } from 'react-leaflet/hooks'

const Huts = ({ huts, setSelectedItem, setShowInfoCard, hutNameFilter }) => {

  const fillColor = '#4c8bf5';
  const hoverColor = '#c4daff';
  const map = useMap();

  const onHutClick = (hut) => {
    setShowInfoCard(true);
    setSelectedItem(hut);
  }

  const handleMouseOver = (e) => {
    e.target.options.fillColor = hoverColor;
    const center = map.getCenter();
    map.panTo(center);
  }
  
  const handleMouseOut = (e) => {
    e.target.options.fillColor = fillColor;
    const center = map.getCenter();
    map.panTo(center);
  }

  const hutPassesNameFilter = (hutName) => {
    return hutName.toLowerCase().includes(hutNameFilter.toLowerCase()); 
  };

  const hutPoints = React.useMemo(() => { 
    return huts && huts.map((coords, idx) => {
      return hutPassesNameFilter(coords.attributes.name) && <CircleMarker 
        color={"#fff"}
        weight={2}
        fillColor={fillColor} 
        fillOpacity={1.0}  
        center={[coords.geometry.y, coords.geometry.x]} 
        key={idx} 
        polygonOptions={{
          color: fillColor,
        }}
        eventHandlers={{ click: () => onHutClick(coords), mouseover: (e) => handleMouseOver(e), mouseout: (e) => handleMouseOut(e) }}
      />
    });
  }, [huts, hutNameFilter]);

  return (
    <LayerGroup>
      <MarkerClusterGroup chunkedLoading>
        {hutPoints}
      </MarkerClusterGroup>
    </LayerGroup>
  )
}

export default Huts;