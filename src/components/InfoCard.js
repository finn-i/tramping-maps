import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const InfoCard = ({ selectedItem, showInfoCard, setShowInfoCard }) => {

  const disableInfoCard = () => {
    setShowInfoCard(false);
  }

  return (
    selectedItem.attributes && showInfoCard &&
    <Card className={'info-card'} >
      <IconButton
        size='large'
        aria-label='close'
        onClick={disableInfoCard}
        sx={{ position: 'absolute', right: 0 }}
      >
        <CloseIcon color={'info'} sx={{ position: 'absolute', right: 0 }}/>
      </IconButton>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={selectedItem.attributes.introductionThumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedItem.attributes.name}
          {selectedItem.attributes.DESCRIPTION}
          <Typography variant='subtitle1' color={'#bbb'}>
            {selectedItem.attributes.place}
          </Typography>
        </Typography>
        <Typography variant="body2">
          {selectedItem.attributes.facilities}
          {(selectedItem.attributes.Shape__Length / 1000).toFixed(1)} km
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.staticLink} target='_blank'>Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;