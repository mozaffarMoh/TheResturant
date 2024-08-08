import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import './book-facility-card.css';
import { ClockSVG, PlaceSVG, UsersSVG } from '../../../../assets/icons';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function BookFacilityCard({
  id,
  title,
  category,
  image,
  time,
  capacity,
  location,
}: {
  id: number;
  title: string;
  category: string;
  image: string;
  time: string;
  capacity: string;
  location: string;
}) {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const { push } = useRouter();

  const arrayOfBottomIcons = [
    {
      icon: <ClockSVG />,
      text: time,
    },
    {
      icon: <UsersSVG />,
      text: capacity,
    },
    {
      icon: <PlaceSVG />,
      text: location,
    },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '1.5rem',
        cursor: 'pointer',
      }}
      onClick={() => push(`${langCookie}/home/book-facility/details/${id}`)}
    >
      <CardOverflow>
        <img
          src={'https://tempcms.theplatformjo.com' + image}
          loading="lazy"
          alt="facility image card"
          className="pt-1"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
      </CardOverflow>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={12}
            display={'flex'}
            justifyContent={'start'}
            alignContent={'center'}
          >
            <Typography className="text-med-fw700">{title}</Typography>
            <Typography className="text-xs bc-secondary-color bf-category-text">
              {category}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            display={'flex'}
            justifyContent={'space-between'}
            alignContent={'center'}
          >
            {arrayOfBottomIcons.map((icon, index) => (
              <Grid
                key={index}
                item
                display={'flex'}
                justifyContent={'start'}
                alignContent={'center'}
                letterSpacing={1}
              >
                {icon.icon}
                <Typography className="text-xs">{icon.text}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
