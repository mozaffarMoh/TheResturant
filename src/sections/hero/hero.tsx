'use client';
import { secondaryColor } from '@/constant/color';
import { settingImage } from '@/constant/images';
import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const HeroSection = () => {
  const t = useTranslations();
  const isScreen500 = useMediaQuery('(max-width:500px)');
  return (
    <Container maxWidth="lg">
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        height={isScreen500 ? 300 :450}
        gap={2}
      >
        <Image
          width={isScreen500 ? 100 : 200}
          height={isScreen500 ? 100 : 200}
          src={settingImage}
          alt="logo"
        />
        <Typography
          variant={isScreen500 ? "h6":"h4"}
          width={isScreen500 ? 250 : 400}
          textAlign={'center'}
          fontWeight={600}
          color={secondaryColor}
        >
          {t('hero.title')}
        </Typography>
      </Stack>
    </Container>
  );
};

export default HeroSection;
