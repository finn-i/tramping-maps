import React, { useState, useMemo } from 'react'
import { MapContainer, Polyline, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const Tracks = ({ tracks, setSelectedItem, setShowInfoCard }) => {

  const lineColor = '#4c8bf5';
  const hoverColor = '#ffffff';
  const map = useMap();

  const onTrackClick = (track) => {
    console.log(track)
    setShowInfoCard(true);
    setSelectedItem(track);
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

  const trackLines = React.useMemo(() => { 
    return tracks && tracks.map((coords, idx) => {
      return coords.geometry.paths && coords.geometry.paths.map((item, idx2) => {
        return <Polyline 
          color={lineColor} 
          weight={4} 
          smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2} 
          eventHandlers={{ click: () => onTrackClick(coords), mouseover: (e) => handleMouseOver(e), mouseout: (e) => handleMouseOut(e)}}
        />
      });
    })
  }, [tracks]);

  return (
    <LayerGroup>
      {trackLines}
    </LayerGroup>
  )
}

export default Tracks;