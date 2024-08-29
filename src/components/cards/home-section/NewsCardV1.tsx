import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import { Paper, Typography } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import './news-card-v1.css';
import dayjs from 'dayjs';

export default function NewsCardV1({
  id,
  title,
  subTitle,
  category,
  date,
}: any) {
  const dateFormat = dayjs(date);
  const day = dateFormat.format('D');
  const month = dateFormat.format('MMMM');

  return (
    <Card
      key={id}
      orientation="horizontal"
      variant="outlined"
      sx={{
        width: '300px',
        paddingInline: '2rem',
        borderRadius: '1.1rem',
        gap: 3,
      }}
      className="news-v1-repo"
    >
      <CardOverflow className="md-news-media">
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
          className="md-news-media-paper"
        >
          <div>{day}</div>
          <div>{month}</div>
        </Paper>
      </CardOverflow>
      <CardContent className="sm-flex-col-reverse">
        <p className="text-reg-card-v1 fw600 ">{title}</p>
        <div className="sm-flex-row-col-425  align-center-425 gap1 ">
          <span className="text-xs opacity-80">{subTitle}</span>
        </div>

        <Typography
          color={'#EB6B2A'}
          fontSize={11}
        >
          {category}
        </Typography>
      </CardContent>
    </Card>
  );
}
