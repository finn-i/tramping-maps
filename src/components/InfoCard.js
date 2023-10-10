import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import HikingIcon from '@mui/icons-material/Hiking';
import TerrainIcon from '@mui/icons-material/Terrain';
import TimerIcon from '@mui/icons-material/Timer';
import PlaceIcon from '@mui/icons-material/Place';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import Chip from '@mui/material/Chip';


const InfoCard = ({ selectedItem, showInfoCard, setShowInfoCard }) => {

  const disableInfoCard = () => {
    setShowInfoCard(false);
  }

  const showHutContent = (selectedItem) => (
    <>
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
        </Typography>
        <Chip icon={<PlaceIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.place} variant="outlined" color="warning" size="small" />
        <Typography variant="body2">
          {selectedItem.attributes.facilities}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.staticLink} target='_blank'>Learn More</Button>
      </CardActions>
    </>
  );

  const showTrackContent = (selectedItem) => (
    <>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={selectedItem.attributes.introductionThumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedItem.attributes.name}
        </Typography>
        <Chip icon={<TerrainIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.difficulty} variant="outlined" color="warning" size="small" />
        <Chip icon={<TimerIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.completionTime} variant="outlined" color="warning" size="small" />
        <Chip icon={<HikingIcon />} sx={{marginRight: 1, marginBottom: 1}} label={(selectedItem.attributes.Shape__Length / 1000).toFixed(1) + "km"} variant="outlined" color="warning" size="small" />
        <Typography variant="body2">
          {selectedItem.attributes.introduction}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.walkingAndTrampingWebPage} target='_blank'>Learn More</Button>
      </CardActions>
    </>
  );

  const showHuntingContent = (selectedItem) => (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedItem.attributes.HuntBlockName}
        </Typography>
        <Chip icon={<PlaceIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.PermitArea} variant="outlined" color="warning" size="small" />
        <Chip icon={<SquareFootIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.Ha.toFixed(1) + "ha"} variant="outlined" color="warning" size="small" />
        <Typography variant="body2">
          Hunting: {selectedItem.attributes.HuntStatus}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.walkingAndTrampingWebPage} target='_blank'>Learn More</Button>
      </CardActions>
    </>
  );
  

  return (
    selectedItem.attributes && showInfoCard &&
    <Card className={'info-card'} >
      <IconButton
        size='large'
        aria-label='close'
        onClick={disableInfoCard}
        sx={{ position: 'absolute', right: 0, margin: 0.5 }}
      >
        <CloseIcon color={'info'} sx={{ position: 'absolute', right: 0 }}/>
      </IconButton>
      {selectedItem.attributes.facilities && showHutContent(selectedItem)}
      {selectedItem.attributes.completionTime && showTrackContent(selectedItem)}
      {selectedItem.attributes.HuntBlockName && showHuntingContent(selectedItem)}
    </Card>
  );
}

export default InfoCard;