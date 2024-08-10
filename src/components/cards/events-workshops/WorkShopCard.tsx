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
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { domain } from '@/base-api/endPoints';
import { greyBackground } from '@/constant/images';

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
  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : greyBackground;
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
          src={imageURL}
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
        <div
          className="  align-center-425  "
          dir="ltr"
        >
          <span className="text-xs opacity-80 m-1">
            <PlaceSVG />
            {place && place?.name}
          </span>
          <span className="text-xs opacity-80">
            <ClockSVG />{' '}
            {metadata &&
              metadata.map((item: any) => {
                return item.slug == 'time' && item.value;
              })}
          </span>
        </div>
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
