'use client';
import type { NextPage } from 'next';
import styles from './page.module.css';
import GridFlex from '@mui/material/Unstable_Grid2';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  FaceBookSVG,
  InstagramSVG,
  LinkedInSVG,
  TwitterSVG,
  UsersSVG,
  WebsiteSVG,
  YoutubeSVG,
} from '../../../../../../../assets/icons';
import { primaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage2 } from '@/constant/images';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import CardSkeletonVertical from '@/components/skeleton/cardSkeletonVertical';
const MentorDetails: NextPage = () => {
  const t = useTranslations();
  const params = useParams();
  const [data, loading, getData] = useGet(
    endPoints.getSubmittedData + params?.id,
    true,
  );
  let imageURL =
    data?.user &&
    data?.user?.media &&
    data?.user.media.length > 0 &&
    data?.user?.media[0]?.url
      ? domain + data?.user?.media[0]?.url
      : DefautImage2;

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      paddingBottom={10}
    >
      <Container maxWidth="lg">
        {loading ? (
          <Stack
            paddingY={10}
            width={'100%'}
            alignItems={'center'}
          >
            <Stack>
              <CardSkeletonVertical
                avatar={true}
                fullFlex="center"
              />
            </Stack>
          </Stack>
        ) : (
          <div>
            <GridFlex
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="mt-4"
              flexDirection="column"
              gap={2}
            >
              <Stack
                alignItems={'center'}
                bgcolor={'white'}
                borderRadius={'50%'}
                width={150}
                height={150}
              >
                <img
                  style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                  src={imageURL}
                  alt="mentor-image"
                />
              </Stack>
              <Typography
                variant="h6"
                className="general-title-v2 primary-color"
                fontFamily={'Montserrat'}
              >
                {data?.user?.name}
              </Typography>
              <Stack
                direction={'row'}
                spacing={1}
                textAlign={'center'}
              >
                {data?.groups &&
                  data?.groups.map((item: any, i: number) => {
                    return (
                      <Typography
                        fontFamily={'Jost'}
                        className="sub-text-large "
                      >
                        {i > 0 && ','} {item}
                      </Typography>
                    );
                  })}
              </Stack>
            </GridFlex>

            <Stack
              direction={'row'}
              justifyContent={'center'}
              width={'100%'}
            >
              {data &&
                data?.data &&
                data?.data.length > 0 &&
                data?.data.map((item: any, i: number) => {
                  if (item.key.includes('link')) {
                    return (
                      <Link
                        href={item.value}
                        target="_blank"
                        className={styles.socialIconContainer}
                      >
                        {item.key.includes('LinkedIn') ? (
                          <LinkedInSVG />
                        ) : item.key.includes('facebook') ? (
                          <FaceBookSVG />
                        ) : item.key.includes('twitter') ? (
                          <TwitterSVG />
                        ) : item.key.includes('Website') ? (
                          <WebsiteSVG />
                        ) : item.key.includes('youtube') ? (
                          <YoutubeSVG />
                        ) : item.key.includes('instagram') ? (
                          <InstagramSVG />
                        ) : (
                          <UsersSVG />
                        )}
                      </Link>
                    );
                  }
                })}
            </Stack>
          </div>
        )}

        {loading ? (
          <Stack>
            <CustomSkeleton width="150px" />
            <CustomSkeleton width="300px" />
            <CustomSkeleton width="300px" />
            <CustomSkeleton width="200px" />
            <CustomSkeleton width="250px" />
            <CustomSkeleton width="300px" />
            <CustomSkeleton width="300px" />
          </Stack>
        ) : (
          <Stack spacing={5}>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                fontWeight={600}
                color={primaryColor}
              >
                {t('dialog.details')}
              </Typography>
              {data &&
                data?.data &&
                data?.data.length > 0 &&
                data?.data.map((item: any, i: number) => {
                  if (
                    !item.key.includes('link') &&
                    !item.key.includes('Certifications') &&
                    !item.key.includes('Interested')
                  ) {
                    return (
                      <Typography
                        variant="body1"
                        color={'#77838F'}
                      >
                        <span style={{ fontWeight: 800 }}>{item.key}</span> :{' '}
                        {Array.isArray(item.value)
                          ? item.value.map((ele: any, i: number) => {
                              const comma = i > 0 ? ', ' : '';
                              return comma + ele;
                            })
                          : item.value}
                      </Typography>
                    );
                  }
                })}
            </Stack>
            <Button
              variant="contained"
              color="inherit"
              className="general-button-primary mt-1"
              sx={{
                width: '200px',
                height: '50px',
                borderRadius: '50px',
                background: '#3F485E',
              }}
            >
              {t('buttons.request')}
            </Button>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

export default MentorDetails;
