import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const InfoCard = ({ selectedItem }) => {
  return (
    selectedItem.attributes &&
    <Card sx={{ maxWidth: 345, position: 'fixed', top: 75, left: 20, zIndex: 450 }} >
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
        <Typography variant="body2">
          {selectedItem.attributes.facilities}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color='secondary' href={selectedItem.attributes.staticLink} target='_blank'>Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;