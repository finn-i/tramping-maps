import React, { useState, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-zoom';
import Box from '@mui/material/Box';

const ElevationChart = ({ chartData }) => {

  const options = {
    bezierCurve: true,
    tension: 0.5,
    scales: {
      y: { type: 'linear', beginAtZero: true },
    },
    elements: {
      point:{
        radius: 0
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      // title: { align: "end", display: true, text: "Distance, m / Elevation, m" },
      legend: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return "Distance: " + tooltipItems[0].label + 'm'
          },
          label: (tooltipItem) => {
            return "Elevation: " + tooltipItem.raw + 'm'
          },
        }
      }
    },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  }

  const data = {
    labels: chartData.elevationArray.map((val, idx) => ((idx + 1) * ((chartData.attributes.Shape__Length / 1000)/chartData.elevationArray.length)).toFixed(0) ), // x-axis 
    // labels: (chartData.selectedItem.attributes.Shape__Length / 1000).toFixed(1),
    datasets: [
      {
        label: 'My Line Chart',
        data: chartData.elevationArray, // y-axis 
        borderColor: 'rgb(75, 192, 192)',
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{height: '10rem', mt: 1}}>
      <Line data={data} options={options} />
    </Box>
  )
}

export default ElevationChart;