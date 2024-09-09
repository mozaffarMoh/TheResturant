import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import './book-facility-card.css';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { domain } from '@/base-api/endPoints';
import { metadataIcons } from '@/constant/metadataIcons';
import { ClockSVG, DurationSVG, PlaceSVG } from '../../../../assets/icons';
import { DefautImage1 } from '@/constant/images';
import { gray100, gray300 } from '@/constant/color';

export default function BookFacilityCard({
  slug,
  title,
  media,
  categories,
  metadata,
  place,
}: any) {
  const pathname = usePathname();
  const langCurrent = pathname.slice(1, 3) || 'en';
  const { push } = useRouter();
  const isScreen650 = useMediaQuery('(max-width:650px)');
  let imageURL =
    media && media?.main_image?.[0]?.url
      ? domain + media?.main_image?.[0]?.url
      : DefautImage1;
  let categoryName =
    categories && categories.length > 0 && categories[0]?.name
      ? categories[0]?.name
      : '';
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '1.5rem',
        cursor: 'pointer',
        width: isScreen650 ? 320 : 400,
        height: isScreen650 ? '100%' : 420,
      }}
      onClick={() => push(`/${langCurrent}/home/book-facility/details/${slug}`)}
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
            flexWrap={'wrap'}
          >
            <Typography
              style={{ fontSize: 18 }}
              className="text-med-fw700"
            >
              {title}
            </Typography>
            {categoryName && (
              <Typography className="text-xs bc-secondary-color bf-category-text">
                {categoryName}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            display={'flex'}
            gap={5}
            justifyContent={'flex-start'}
            alignContent={'center'}
            marginY={2}
          >
            {place && place?.name && (
              <Grid
                item
                display={'flex'}
                justifyContent={'start'}
                alignContent={'center'}
                gap={1}
                letterSpacing={1}
              >
                <PlaceSVG />
                <Typography
                  variant="body2"
                  color={gray300}
                >
                  {place && place?.name}
                </Typography>
              </Grid>
            )}
            {metadata &&
              metadata.length > 0 &&
              metadata.map((item: any) => {
                let SvgIcon = metadataIcons(item?.itemMetaKey?.slug);
                return (
                  (item?.itemMetaKey?.slug == 'capacity-range' ||
                    item?.itemMetaKey?.slug == 'time') && (
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
                      <Typography
                        variant="body2"
                        color={gray300}
                      >
                        {item.value}
                      </Typography>
                    </Grid>
                  )
                );
              })}
            {/*   <Grid
              item
              display={'flex'}
              justifyContent={'start'}
              alignContent={'center'}
              gap={1}
              letterSpacing={1}
            >
              <ClockSVG />
              <Typography
                variant="body2"
                color={gray300}
              >
                12:32:00
              </Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
