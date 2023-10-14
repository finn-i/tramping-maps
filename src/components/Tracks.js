import React, { useState, useMemo } from 'react'
import { MapContainer, Polyline, LayerGroup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

const Tracks = ({ tracks, setSelectedItem, setShowInfoCard, trackNameFilter, trackDistanceFilter }) => {

  const lineColor = '#4c8bf5';
  const hoverColor = '#c4daff';
  const map = useMap();

  const onTrackClick = (track) => {
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

  const trackPassesNameFilter = (trackName) => {
    return trackName.toLowerCase().includes(trackNameFilter.toLowerCase()); 
  };

  const trackPassesDistanceFilter = (trackDistance) => {
    return (trackDistance >= trackDistanceFilter[0] && trackDistance <= trackDistanceFilter[1]);
  };

  const trackLines = React.useMemo(() => { 
    return tracks && tracks.map((coords, idx) => {
      return trackPassesNameFilter(coords.attributes.name) && trackPassesDistanceFilter(coords.attributes.Shape__Length / 1000) && coords.geometry.paths && coords.geometry.paths.map((item, idx2) => {
        return <Polyline 
          color={lineColor} 
          weight={5}
          // dashArray={'8, 8'}
          // smoothFactor={2.0} 
          positions={item.map(point => [point[1],point[0]])} 
          key={idx+idx2} 
          eventHandlers={{ click: () => onTrackClick(coords), mouseover: (e) => handleMouseOver(e), mouseout: (e) => handleMouseOut(e)}}
        />
      });
    })
  }, [tracks, trackNameFilter, trackDistanceFilter]);

  return (
    <LayerGroup>
      {trackLines}
    </LayerGroup>
  )
}

export default Tracks;