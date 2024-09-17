import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import './workshop-card.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { Box, Button, Stack, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';
import Image from 'next/image';

export default function WorkShopCard({
  title,
  subTitle,
  media,
  slug,
  itemMetaData,
  place,
}: {
  title: string;
  subTitle: string;
  media: any;
  slug: string;
  itemMetaData: any;
  place: any;
}) {
  const { push } = useRouter();
  const t = useTranslations();
  const isScreen400 = useMediaQuery('(max-width:400px)');
  let imageURL =
    media && media?.main_image?.[0]?.url
      ? domain + media?.main_image?.[0]?.url
      : DefautImage1;

  let subTitleSentence =
    subTitle.length > 140 ? subTitle?.slice(0, 140) + '...' : subTitle;
  return (
    <Card
      variant="outlined"
      sx={{
        width: isScreen400 ? 250 : 330,
        minHeight: 400,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      <CardOverflow
        sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}
      >
        <Box
          style={{
            width: '100%',
            height: '200px',
            position: 'relative',
          }}
        >
          <Image
            src={imageURL}
            fill
            loading="lazy"
            alt="workshop image card"
          />
        </Box>
      </CardOverflow>
      <CardContent
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack>
          <p className="text-med-fw700  p-0 ">
            {title}
            <br />
        {/*     <span className="text-xs  p-0">{subTitleSentence}</span> */}
          </p>

          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'flex-start'}
            
          >
            {place && place?.name && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
                className="text-xs opacity-80"
              >
                <PlaceSVG />
                {place && place?.name}
              </Stack>
            )}

        
            {itemMetaData &&
              itemMetaData.length > 0 &&
              itemMetaData.map((item: any) => {
                return (
                  item?.itemMetaKey?.slug == 'time' && (
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      gap={1}
                      className="text-xs opacity-80 "
                    >
                      <ClockSVG />
                      {item.value}{' '}
                    </Stack>
                  )
                );
              })}
          </Stack>
        </Stack>
        <Button
          sx={{ marginTop: 'auto' }}
          className="general-button-primary mt-1"
          onClick={() => push(`events-workshops/workshops/${slug}`)}
        >
          {t('buttons.view')}
        </Button>
      </CardContent>
    </Card>
  );
}
