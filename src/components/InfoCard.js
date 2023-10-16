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

// import puppeteer from 'puppeteer';


const InfoCard = ({ selectedItem, showInfoCard, setShowInfoCard }) => {

  const disableInfoCard = () => {
    setShowInfoCard(false);
  }

  // const puppeteerOptions = {
  //   headless: false, // Set to false if you want to open and see the robot in action
  //   devtools: false,
  // };

  // const getFullResImage = async (url) => {
  //   console.log('retrieving full-res image...')
    // const browser = await puppeteer.launch(puppeteerOptions);
    // const page = await browser.newPage();
    // await page.goto(url);
    // const backgroundImage = await page.evaluate(el => window.getComputedStyle(el).backgroundImage, await page.$('.page-hero'));
    // console.log(backgroundImage);
    // await browser.close();
  // }
  // getFullResImage(selectedItem.attributes.staticLink);

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
        <Chip icon={<PlaceIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.place} variant="outlined" color="secondary" size="small" />
        <Typography variant="body2">
          {selectedItem.attributes.facilities}
        </Typography>
      </CardContent>
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
        <Chip icon={<TerrainIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.difficulty} variant="outlined" color="secondary" size="small" />
        <Chip icon={<TimerIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.completionTime} variant="outlined" color="secondary" size="small" />
        <Chip icon={<HikingIcon />} sx={{marginRight: 1, marginBottom: 1}} label={(selectedItem.attributes.Shape__Length / 1000).toFixed(1) + "km"} variant="outlined" color="secondary" size="small" />
        <Typography variant="body2">
          {selectedItem.attributes.introduction}
        </Typography>
      </CardContent>
    </>
  );

  const showHuntingContent = (selectedItem) => (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedItem.attributes.HuntBlockName}
        </Typography>
        <Chip icon={<PlaceIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.PermitArea} variant="outlined" color="secondary" size="small" />
        <Chip icon={<SquareFootIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.Ha.toFixed(1) + "ha"} variant="outlined" color="secondary" size="small" />
      </CardContent>
    </>
  );

  const showPublicContent = (selectedItem) => (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedItem.attributes.Name}
        </Typography>
        {selectedItem.attributes.PermitArea && <Chip icon={<PlaceIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.PermitArea} variant="outlined" color="secondary" size="small" />}
        <Chip icon={<SquareFootIcon />} sx={{marginRight: 1, marginBottom: 1}} label={selectedItem.attributes.Recorded_Area.toFixed(1) + "ha"} variant="outlined" color="secondary" size="small" />
      </CardContent>
    </>
  );
  

  return (
    selectedItem.attributes && showInfoCard &&
    <Card className={'info-card'} >
      {selectedItem.attributes.facilities && showHutContent(selectedItem)}
      {selectedItem.attributes.completionTime && showTrackContent(selectedItem)}
      {selectedItem.attributes.HuntBlockName && showHuntingContent(selectedItem)}
      {selectedItem.attributes.Legislation && showPublicContent(selectedItem)}
      <CardActions sx={{justifyContent: 'space-between', margin: 1, marginTop: 0}}>
        {(selectedItem.attributes.walkingAndTrampingWebPage || selectedItem.attributes.staticLink) && 
          <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.walkingAndTrampingWebPage || selectedItem.attributes.staticLink} target='_blank'>Learn More</Button>
        } 
        <Button size="small" variant="outlined" color='secondary' onClick={disableInfoCard}>Close</Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;