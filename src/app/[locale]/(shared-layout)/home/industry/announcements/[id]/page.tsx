'use client';
import type { NextPage } from 'next';
import Image from 'next/image';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import usePost from '@/custom-hooks/usePost';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1Large, DefautImage2, headBar } from '@/constant/images';
import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import { HeroSection } from '@/sections/home';

const JobOfferDetails: NextPage = () => {
  const t = useTranslations();
  const isScreen1024 = useMediaQuery('(max-width:1024px)');
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const [isClientSide, setIsClientSide] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
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
    data && data?.[0]?.media?.main_image?.[0]?.url
      ? domain + data?.[0]?.media?.main_image?.[0]?.url
      : DefautImage1Large;

  let imageURLAvatart =
    isMetaDataExist &&
    data &&
    data?.[0]?.itemMetaData?.[0]?.media?.image?.[0]?.url
      ? domain + data?.[0]?.itemMetaData?.[0]?.media?.image?.[0]?.url
      : DefautImage2;

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  console.log(data);

  const getLanguageValue = (data: any) => {
    if (!isMetaDataExist) return '';

    const isArabic = pathname.startsWith('/ar');
    const key = isArabic ? 'ar' : 'en';

    const matchingItem = data?.[0]?.itemMetaData.find((item: any) =>
      item?.itemMetaKey?.slug?.endsWith(key),
    );
    const defaultItem = data?.[0]?.itemMetaData.find((item: any) =>
      item?.itemMetaKey?.slug?.endsWith('en'),
    );

    if (!matchingItem?.value) {
      return defaultItem?.value;
    }

    return matchingItem?.value || ''; // Return empty string if no match found
  };

  const langValue = getLanguageValue(data);
  return (
    <>
      {isClientSide && (
        <head>
          <title>{t('metadata.job_details')}</title>
          <meta
            name="description"
            content="Welcome to the Job-Offering Details page of The Platform Website"
          />
        </head>
      )}
      {/*       {loading ? (
        <Skeleton
          sx={{ height: '400px', bgcolor: 'grey.500' }}
          width={'100%'}
          animation="wave"
          variant="rectangular"
        />
      ) : (
    
      )} */}
      <HeroSection
        bannerImage={imageURL}
        noText
        loading={loading}
      />{' '}
      <Stack position={'relative'}>
        <img
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
        {loading ? (
          <Stack
            gap={2}
            paddingY={10}
            direction={'row'}
            flexWrap={'wrap'}
            justifyContent={'space-evenly'}
            width={'100%'}
          >
            {' '}
            <Stack justifyContent={'flex-start'}>
              <Stack
                direction={'row'}
                width={'300px'}
                gap={2}
                alignItems={'center'}
              >
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                />
                <CustomSkeleton width="100px" />
              </Stack>
              <CustomSkeleton width="300px" />
              <CustomSkeleton width="300px" />
              <CustomSkeleton width="300px" />
            </Stack>{' '}
            <Stack>
              <CustomSkeleton
                variant="rectangle"
                width="200px"
                height="200px"
                borderRadius="20px"
              />{' '}
            </Stack>
          </Stack>
        ) : (
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
                    {data?.[0] && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.[0]?.description,
                        }}
                      />
                    )}
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
                    {t('dialog.how-to-apply')}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontFamily={'Jost'}
                  >
                    <bdi>{isMetaDataExist && langValue}</bdi>
                  </Typography>
                  <Button
                    className="general-button-primary mt-1"
                    sx={{ width: '200px' }}
                    href={
                      isMetaDataExist &&
                      data?.[0]?.itemMetaData?.[2] &&
                      data?.[0]?.itemMetaData?.[2]?.value
                    }
                    target="_blank"
                  >
                    {t('buttons.apply-now')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default JobOfferDetails;
