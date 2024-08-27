import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import './workshop-card.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { Box, Button, Stack, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';

export default function WorkShopCard({
  title,
  subTitle,
  media,
  slug,
  metadata,
  place,
}: {
  title: string;
  subTitle: string;
  media: any;
  slug: string;
  metadata: any;
  place: any;
}) {
  const { push } = useRouter();
  const t = useTranslations();
  const isScreen400 = useMediaQuery('(max-width:400px)');
  let imageURL =
    media && media?.main_image?.[0]?.url
      ? domain + media?.main_image?.[0]?.url
      : DefautImage1;
  return (
    <Card
      variant="outlined"
      sx={{
        width: isScreen400 ? 250 : 300,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      <CardOverflow
        sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}
      >
        <img
          src={imageURL}
          width={'100%'}
          height={200}
          loading="lazy"
          alt="workshop image card"
        />
      </CardOverflow>
      <CardContent>
        <p className="text-med-fw700  p-0 ">
          {title}
          <br />
          <span className="text-xs  p-0">{subTitle}</span>
        </p>
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'flex-start'}
          dir="ltr"
        >
          <div className="text-xs opacity-80">
            <PlaceSVG />
            {place && place?.name}
          </div>
          <div className="text-xs opacity-80">
            <ClockSVG />{' '}
            {metadata &&
              metadata.length > 0 &&
              metadata.map((item: any) => {
                return item.slug == 'time' && item.value;
              })}
          </div>
        </Stack>
        <Button
          className="general-button-primary mt-1"
          onClick={() => push(`events-workshops/workshops/${slug}`)}
        >
          {t('buttons.view')}
        </Button>
      </CardContent>
    </Card>
  );
}
