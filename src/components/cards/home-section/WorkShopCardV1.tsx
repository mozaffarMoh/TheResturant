import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import {  Paper } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import './workshop-card-v1.css';

export default function WorkShopCardV1({ key, title, metadata, place }: any) {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    if (metadata.length > 0) {
      metadata.forEach((item: any) => {
        if (item.slug == 'date') {
          setDay(item.value.split('-')[2]);
          setMonth(
            new Date(item.value.split('-')[1]).toLocaleDateString('en-GB', {
              month: 'long',
            }),
          );
        }
        if (item.slug == 'time') {
          setTime(item.value);
        }
      });
    }
  }, [metadata]);

  return (
    <Card
      key={key}
      orientation="horizontal"
      variant="outlined"
      sx={{
        width: 'auto',
        paddingInline: '2rem',
        borderRadius: '1.1rem',
        gap: 3,
      }}
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
            <PlaceSVG /> {place.name}
          </span>
          <span className="text-xs opacity-80">
            <ClockSVG /> {time}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
