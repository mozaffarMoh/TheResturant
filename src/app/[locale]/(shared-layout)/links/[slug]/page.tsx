'use client';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect, useState } from 'react';
import {
  Container,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { NextPage } from 'next';
import NoData from '@/components/NoData/NoData';
import { primaryColor } from '@/constant/color';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const LinksPage: NextPage = () => {
  const params = useParams();
  const t = useTranslations();
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const [isClientSide, setIsClientSide] = useState(false);
  const [data, loading, getData, success] = useGet(
    endPoints.getSinglePublicPage + params?.slug,
  );

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingY: 10 }}
    >
      {' '}
      {isClientSide && (
        <head>
          <title>{t('metadata.public-page')}</title>
          <meta
            name="description"
            content="Welcome to the Public page of The Platform Website"
          />
        </head>
      )}
      <Stack alignItems={'center'}>
        {loading ? (
          <Skeleton
            variant="text"
            width={isScreen500 ? 100 : 250}
          />
        ) : (
          <Typography
            color={primaryColor}
            variant="h4"
            fontWeight={600}
          >
            {data?.title && data?.title}
          </Typography>
        )}
      </Stack>
      <Stack
        alignItems={'flex-start'}
        marginTop={5}
      >
        {' '}
        {loading ? (
          <Stack alignItems={'center'}>
            {Array.from({ length: 6 }).map(() => {
              return (
                <Skeleton
                  variant="text"
                  width={isScreen500 ? 180 : 400}
                />
              );
            })}
          </Stack>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data?.text,
            }}
          />

          /*   data.map((item: any) => {
            return (
              <>
                <Typography
                  gutterBottom
                  className="fw700"
                >
                  {item.title}
                </Typography>
                <Typography gutterBottom>{item.subTitle}</Typography>
              </>
            );
          }) */
        )}
      </Stack>
      {success && !data && <NoData />}
    </Container>
  );
};

export default LinksPage;
