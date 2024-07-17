import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import './workshop-card-v2.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';

export default function WorkShopCardV2({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
      className="workshop-v1-repo"
    >
      <CardOverflow className="md-workshop-media">
        <img
          src={image}
          loading="lazy"
          alt="workshop image card"
          className="md-workshop-media-image pt-1 pb-1"
        />
      </CardOverflow>
      <CardContent>
        <div className="sm-flex-row-row">
          <PlaceSVG />
          <span className="text-workshop-place-time "> AMMAN, JORDAN</span>{' '}
          <ClockSVG />{' '}
          <span className="text-workshop-place-time ">8:00 am - 5:00 pm</span>
        </div>
        <Typography level="title-md">{title}</Typography>
      </CardContent>
    </Card>
  );
}
