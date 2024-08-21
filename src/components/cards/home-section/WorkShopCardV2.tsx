import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import './workshop-card-v2.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';
import { Stack } from '@mui/material';

export default function WorkShopCardV2({ key, title, subTitle, media }: any) {
  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : DefautImage1;
  return (
    <Card
      key={key}
      variant="outlined"
      sx={{
        width: 280,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      <Stack>
        <img
          src={imageURL}
          loading="lazy"
          alt="news-card-image"
          style={{ width: '100%', height: 200, borderRadius: '10px' }}
        />
      </Stack>
      <CardContent>
        <span className=" opacity-80">{title}</span>
        <p className="text-med-fw700 max-subtile-80 ">{subTitle}</p>
      </CardContent>
    </Card>
  );
}
