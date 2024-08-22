import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import './workshop-card-v2.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';
import { Button, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function WorkShopCardV2({
  key,
  title,
  subTitle,
  media,
  category,
}: any) {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : DefautImage1;
  return (
    <Card
      key={key}
      variant="outlined"
      sx={{
        width: 300,
        borderRadius: '1.1rem',
        padding: 1,
      }}
      style={{ margin: '0px' }}
    >
      <Stack position={'relative'}>
        <img
          src={imageURL}
          loading="lazy"
          alt="news-card-image"
          style={{ width: '100%', height: 250, borderRadius: '15px' }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: '50px',
            position: 'absolute',
            bottom: 10,
            left: !isArabic ? 10 : '',
            right: isArabic ? 10 : '',
            fontSize: '11px',
            height: '23px',
            background: '#EB6B2A',
            boxShadow: 'none',
            '&:hover': {
              background: '#EB6B2A',
              cursor: 'default',
              boxShadow: 'none',
            },
          }}
        >
          {category}
        </Button>
      </Stack>
      <CardContent>
        <span className=" opacity-80">{title}</span>
        <p className="text-med-fw700 max-subtile-80 ">{subTitle}</p>
      </CardContent>
    </Card>
  );
}
