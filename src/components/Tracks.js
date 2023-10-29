import React, { useState, useMemo } from 'react'
import { MapContainer, Polyline, LayerGroup, Tooltip } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import Topography, { getTopography, configure, TopoLayer } from 'leaflet-topography';
import * as L from "leaflet";



const Tracks = ({ tracks, setSelectedItem, setShowInfoCard, trackNameFilter, trackDistanceFilter }) => {

  const lineColor = '#4c8bf5';
  const hoverColor = '#c4daff';
  const elevationURL = "https://data.linz.govt.nz/services/query/v1/raster.json/?key=56db51a141764e94b53dfd65c78a2f99&layer=51768";
  const map = useMap();

  const onTrackClick = (track) => {
    let eleArray = [];
    let distArray = [];
    let promises = [];
    const options = {
      token: 'pk.eyJ1Ijoibm9tYWRkIiwiYSI6ImNraHpiang5YzBkajIycG5rcWVubDh4OXQifQ.rKZjs-LZeaGE7lqG-7lZtg'
    };

    // track.geometry.paths.map((item, idx) => {
    //   let prev = false;
    //   item.map(pt => {
    //     const latlng = L.latLng(pt[1],pt[0]);
    //     if (prev) distArray.push(map.distance(prev, latlng));
    //     const promise = L.Topography.getTopography(latlng, options).then((res) => {
    //       eleArray.push(Math.round(res.elevation));
    //     });
    //     promises.push(promise);
    //     prev = latlng;
    //     // const promise = fetch(elevationURL + "&x=" + pt[0] + "&y=" + pt[1])
    //     //   .then(res => res.json())
    //     //   .then(res => {
    //     //     if (res.rasterQuery.layers[51768].bands[0]) {
    //     //       eleArray.push(res.rasterQuery.layers[51768].bands[0].value);
    //     //     }
    //     //   });
    //     // promises.push(promise);
    //   });
    // });

    // Promise.all(promises)
    //   .then(() => {
    //     console.log(eleArray); 
    //     console.log(distArray); 
    //     track.elevationArray = eleArray;
    //     track.distanceArray = distArray;
    //     setShowInfoCard(true);
    //     setSelectedItem(track);
    //   })
    //   .catch(error => {
    //     console.error("An error occurred:", error);
    //   });
        
    setShowInfoCard(true);
    setSelectedItem(track);
  }

  const handleMouseOver = (e) => {
    e.target.options.color = hoverColor;
    const center = map.getCenter();
    map.panTo(center);
  };
  
  const handleMouseOut = (e) => {
    if (!document.getElementsByClassName('info-card')[0] || !document.getElementsByClassName('info-card')[0].textContent.includes(e.target._tooltip.options.children)) {
      e.target.options.color = lineColor;
      const center = map.getCenter();
      map.panTo(center);
    }
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
        >
          <Tooltip>
            {coords.attributes.name}
          </Tooltip>
        </Polyline>
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