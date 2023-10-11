import React, { useState, useMemo } from 'react'
import { Polyline, LayerGroup } from 'react-leaflet';

const Tracks = ({ tracks, setSelectedItem, setShowInfoCard }) => {

  const [lineColor, setLineColor] = useState('#4c8bf5');

  const onTrackClick = (track) => {
    console.log(track)
    setShowInfoCard(true);
    setSelectedItem(track);
  }

  const handleMouseOver = () => {
    setLineColor('#ffffff'); // Change the color on hover
  };

  const handleMouseOut = () => {
    setLineColor('#4c8bf5'); // Change the color back to the initial color
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
          eventHandlers={{ click: () => onTrackClick(coords), mouseover: handleMouseOver, mouseout: handleMouseOut}}
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