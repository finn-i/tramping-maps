import React, { useState, useMemo } from 'react'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useMap } from 'react-leaflet/hooks';

const LoadAlert = ({ loadState }) => {

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Alert
        color='info'
        sx={{position: 'absolute', bottom: 5, zIndex: 500}}
        action={<CircularProgress size={24} color="inherit" style={{ marginRight: '8px' }}/>}
        icon={false}
      >
        Gathering {loadState}...
      </Alert>
    </Box>
  );
}

export default LoadAlert;