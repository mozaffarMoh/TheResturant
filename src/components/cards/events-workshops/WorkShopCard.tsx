import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import './workshop-card.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { Button } from '@mui/material';

export default function WorkShopCard({
  title,
  subTitle,
  image,
}: {
  title: string;
  subTitle: string;
  image: string;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 280,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
      className="workshop-repo"
    >
      <CardOverflow className="md-workshop-media">
        <img
          src={image}
          loading="lazy"
          alt="workshop image card"
          className="md-workshop-media-image pt-1 "
        />
      </CardOverflow>
      <CardContent>
        <p className="text-med-fw700  p-0 ">
          {title}
          <br />
          <span className="text-xs  p-0">{subTitle}</span>
        </p>
        <div className="  align-center-425  ">
          <span className="text-xs opacity-80 m-1">
            <PlaceSVG />
            AMMAN, JORDAN
          </span>
          <span className="text-xs opacity-80">
            <ClockSVG /> 3:00 pm
          </span>
        </div>
        <div className="  align-center-425  ">
          <span className="text-xs opacity-80 m-1">
            <PlaceSVG />
            AMMAN, JORDAN
          </span>
          <span className="text-xs opacity-80">
            <ClockSVG /> 2:00 pm
          </span>
        </div>
        <Button className="general-button-primary mt-1">View</Button>
      </CardContent>
    </Card>
  );
}
