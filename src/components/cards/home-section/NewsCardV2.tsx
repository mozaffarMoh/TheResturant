import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import './news-card-v2.css';
import { ClockSVG, DateSVG } from '../../../../assets/icons';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';

export default function NewsCardV2({
  title,
  subTitle,
  media,
  category,
  dateTime,
}: any) {
  const isScreen400 = useMediaQuery('(max-width:400px)');
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  let imageURL =
    media && media?.main_image?.[0]?.url
      ? domain + media?.main_image?.[0]?.url
      : DefautImage1;

  const date = dateTime
    ? dayjs(dateTime?.split(' ')?.[0]).format('MMMM DD, YYYY')
    : '';
  const time = dateTime?.split(' ')?.[1];

  return (
    <Card
      variant="outlined"
      sx={{
        width: isScreen400 ? 250 : 320,
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
        {category && (
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
        )}
      </Stack>
      <CardContent>
        <Stack
          direction={'row'}
          gap={2}
        >
          <Stack
            direction={'row'}
            gap={1}
          >
            <DateSVG />
            <Typography
              fontSize={13}
              className=" opacity-80"
            >
              {' '}
              {date}
            </Typography>
          </Stack>{' '}
          <Stack
            direction={'row'}
            gap={1}
          >
            <ClockSVG />
            <Typography
              fontSize={13}
              className=" opacity-80"
            >
              {' '}
              {time}
            </Typography>
          </Stack>
        </Stack>
        <p className="text-med-fw700 max-subtile-80 ">{title}</p>
      </CardContent>
    </Card>
  );
}
