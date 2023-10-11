import React, { useState } from 'react'
import { CircleMarker, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';


const Huts = ({ huts, setSelectedItem, setShowInfoCard }) => {

  const onHutClick = (hut) => {
    setShowInfoCard(true);
    setSelectedItem(hut);
  }

  const hutPoints = React.useMemo(() => { 
    return huts && huts.map((coords, idx) => {
      return <CircleMarker 
        color={"#FFF"}
        weight={2}
        fillColor={"#4c8bf5"} 
        fillOpacity={1.0}  
        center={[coords.geometry.y, coords.geometry.x]} 
        key={idx} 
        polygonOptions={{
          color: '#4c8bf5',
        }}
        eventHandlers={{ click: () => onHutClick(coords) }}
      />
    });
  }, [huts]);

  return (
    <LayerGroup>
      <MarkerClusterGroup chunkedLoading>
        {hutPoints}
      </MarkerClusterGroup>
    </LayerGroup>
  )
}

export default Huts;