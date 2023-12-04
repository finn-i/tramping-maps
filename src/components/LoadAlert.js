import React, { useState, useMemo } from 'react'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useMap } from 'react-leaflet/hooks';
import { LinearProgress } from '@mui/material';

const LoadAlert = ({ loadState, loadValue }) => {

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Alert
        color='info'
        sx={{position: 'absolute', bottom: 5, zIndex: 500}}
        action={<CircularProgress size={24} color="inherit" style={{ marginRight: '8px' }}/>}
        icon={false}
      >
        Gathering {loadState}...
        {loadState.includes('Public Land') && 
          <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0, zIndex: 501 }}>
            <LinearProgress variant={'determinate'} value={loadValue} color={'secondary'} />
          </Box>
        }
      </Alert>
    </Box>
  );
}

export default LoadAlert;