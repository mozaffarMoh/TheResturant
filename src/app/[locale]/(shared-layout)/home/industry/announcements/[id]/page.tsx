'use client';

import type { NextPage } from 'next';
import jobOfferImage from '../../../../../../../../public/industry/announcments/job-offer-background.png';
import headBar from '../../../../../../../../public/industry/announcments/head.png';
import Image from 'next/image';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import usePost from '@/custom-hooks/usePost';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1Large, DefautImage2 } from '@/constant/images';
import { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';

const JobOfferDetails: NextPage = () => {
  const t = useTranslations();
  const isScreen1024 = useMediaQuery('(max-width:1024px)');
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const params = useParams();
  const pathname = usePathname();
  const body = {
    modelName: 'Item',
    filters: {
      slug: params?.id,
    },
    fields: ['slug', 'title', 'subTitle', 'description', 'media'],
    relations: {
      itemMetaData: {
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['value', 'media'],
      },
    },
  };

  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);
  const isMetaDataExist =
    data &&
    data.length > 0 &&
    data[0].itemMetaData &&
    data[0].itemMetaData.length > 0;

  let imageURL =
    data &&
    data.length > 0 &&
    data[0].media.length > 0 &&
    data[0]?.media[0]?.url
      ? domain + data[0]?.media[0]?.url
      : DefautImage1Large;

  let imageURLAvatart =
    isMetaDataExist &&
    data[0]?.itemMetaData[0]?.media &&
    data[0]?.itemMetaData[0]?.media.length > 0
      ? domain + data[0]?.itemMetaData[0]?.media[0]?.url
      : DefautImage2;

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Stack position={'relative'}>
        <img
          src={imageURL}
          alt={'jobOfferImage'}
          style={{ width: '100%', height: isScreen600 ? '250px' : '400px' }}
        />
        <Image
          src={headBar}
          alt={'headBar'}
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '25%',
            width: '50%',
            height: '10px',
          }}
        />
      </Stack>
      <Container
        maxWidth="lg"
        className="mt-4  mb-4"
      >
        <Grid
          container
          sx={{ flexDirection: isScreen1024 ? 'column' : '' }}
          alignItems={'flex-start'}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={9}
          >
            <Stack>
              <Stack
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                width={'200px'}
              >
                <img
                  src={imageURLAvatart}
                  alt={'InstructorImage'}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                  }}
                />

                <Typography
                  variant="body1"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Jost'}
                  marginX={2}
                >
                  {isMetaDataExist &&
                    data[0]?.itemMetaData[0]?.itemMetaKey?.name}
                </Typography>
              </Stack>
              <Stack
                padding={2}
                gap={2}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Jost'}
                >
                  {data[0] && data[0]?.title}
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily={'Jost'}
                >
                  {data[0] && data[0]?.description}
                  {/*    <div
                    dangerouslySetInnerHTML={{
                      __html: data[0] && data[0]?.description,
                    }}
                  /> */}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Card
              variant="outlined"
              sx={{
                width: 260,
                paddingTop: '1rem',
                borderRadius: '1.1rem',
                margin: '0.2rem',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Montserrat'}
                >
                  {isMetaDataExist &&
                    data[0]?.itemMetaData[1]?.itemMetaKey?.name}
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily={'Jost'}
                >
                  {isMetaDataExist &&
                    data[0]?.itemMetaData[1] &&
                    data[0]?.itemMetaData[1]?.value}
                </Typography>
                <Button
                  className="general-button-primary mt-1"
                  sx={{ width: '200px' }}
                  href={
                    isMetaDataExist &&
                    data[0]?.itemMetaData[2] &&
                    data[0]?.itemMetaData[2]?.value
                  }
                  target="_blank"
                >
                  {t('buttons.apply-now')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default JobOfferDetails;
