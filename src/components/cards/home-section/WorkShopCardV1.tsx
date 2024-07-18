import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import './workshop-card-v1.css';

export default function WorkShopCardV1({
  title,
  day,
  month,
}: {
  title: string;
  day: string;
  month: string;
}) {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: 'auto', paddingInline: '2rem', borderRadius: '1.1rem' }}
      className="workshop-v1-repo"
    >
      <CardOverflow className="md-workshop-media">
        <Paper
          sx={{
            width: '5rem',
            height: 'auto',
            backgroundColor: primaryColor,
            borderRadius: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
          className="md-workshop-media-paper"
        >
          <div>{day}</div>
          <div>{month}</div>
        </Paper>
      </CardOverflow>
      <CardContent className="sm-flex-col-reverse">
        <p className="text-reg-card-v1 fw600 p-px-4">{title}</p>
        <div className="sm-flex-row-col-425  align-center-425 gap1 ">
          <span className="text-xs opacity-80">
            <PlaceSVG /> AMMAN, JORDAN
          </span>
          <span className="text-xs opacity-80">
            <ClockSVG /> 8:00 am - 5:00 pm
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
