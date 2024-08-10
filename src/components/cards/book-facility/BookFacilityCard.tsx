import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import './book-facility-card.css';
import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { domain } from '@/base-api/endPoints';
import { metadataIcons } from '@/constant/metadataIcons';
import { PlaceSVG } from '../../../../assets/icons';
import { greyBackground } from '@/constant/images';

export default function BookFacilityCard({
  slug,
  title,
  media,
  categories,
  metadata,
  place,
}: any) {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const { push } = useRouter();
  let imageURL =
    media && media.length > 0 && media[0]?.url ? domain + media[0]?.url : greyBackground;
  let categoryName = categories[0]?.name ? categories[0]?.name : '';
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '1.5rem',
        cursor: 'pointer',
      }}
      onClick={() => push(`/${langCookie}/home/book-facility/details/${slug}`)}
    >
      <CardOverflow>
        <img
          src={imageURL}
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
              {categoryName}
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
            {metadata.map((item: any) => {
              let SvgIcon = metadataIcons(item.slug);
              return (
                (item.slug == 'capacity-range' || item.slug == 'time') && (
                  <Grid
                    key={item.id}
                    item
                    display={'flex'}
                    justifyContent={'start'}
                    alignContent={'center'}
                    letterSpacing={1}
                    gap={1}
                  >
                    {SvgIcon && <SvgIcon />}
                    <Typography className="text-xs">{item.value}</Typography>
                  </Grid>
                )
              );
            })}
            <Grid
              item
              display={'flex'}
              justifyContent={'start'}
              alignContent={'center'}
              gap={1}
              letterSpacing={1}
            >
              <PlaceSVG />
              <Typography className="text-xs">{place.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
