'use client';
import { Box, Typography, Button, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import {
  appleStoreButtonDownload,
  downloadYourAppImage,
  googlePlayButtonDownload,
  QRCodeImage,
  scanImage,
} from '@/constant/images';
import { useTranslations } from 'next-intl';

const Download = () => {
  const t = useTranslations();
  const isScreen650 = useMediaQuery('(max-width:650px)');
  return (
    <Stack
      textAlign={'center'}
      paddingY={20}
      id="download"
    >
      <Typography
        variant="h4"
        fontWeight={600}
      >
        {t('titles.downloadTheApp')}
      </Typography>
      <Stack
        direction={'row'}
        marginTop={10}
        justifyContent={'center'}
        gap={3}
      >
        {!isScreen650 && (
          <Image
            src={downloadYourAppImage}
            width={200}
            height={200}
            alt="downloadYourAppImage"
          />
        )}
        <Image
          src={QRCodeImage}
          width={200}
          height={200}
          alt="downloadYourAppImage"
        />{' '}
        {!isScreen650 && (
          <Image
            src={scanImage}
            width={200}
            height={200}
            alt="downloadYourAppImage"
          />
        )}
      </Stack>
      <Stack
        height={50}
        direction={isScreen650 ? 'column' : 'row'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={5}
        gap={1}
      >
        <Button
          sx={{
            padding: 3,
            borderRadius: 10,
            cursor: 'pointer',
            width: 150,
            height: 25,
          }}
        >
          <Image
            src={googlePlayButtonDownload}
            fill
            alt="google-play-button"
          />
        </Button>
        <Button
          sx={{
            padding: 3,
            borderRadius: 10,
            cursor: 'pointer',
            width: 150,
            height: 25,
          }}
        >
          <Image
            src={appleStoreButtonDownload}
            fill
            alt="apple-store"
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Download;
