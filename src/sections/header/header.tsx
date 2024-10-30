'use client';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import { logoImage } from '@/constant/images';
import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
const Header = () => {
  const t = useTranslations();
  const isScreen500 = useMediaQuery('(max-width:500px)');
  return (
    <Container maxWidth="lg">
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        paddingY={3}
      >
        <Stack
          direction={'row'}
          gap={1}
        >
          <Image
            width={isScreen500 ? 30 : 40}
            height={isScreen500 ? 30 : 40}
            src={logoImage}
            alt="logo"
          />
          <Stack
            color={'white'}
            marginTop={isScreen500 ? 0 : 0.5}
          >
            <Typography
              fontSize={isScreen500 ? 14 : 18}
              fontWeight={600}
            >
              {t('header.title')}
            </Typography>
            <Typography
              alignSelf={isScreen500 ? 'flex-start' : 'flex-end'}
              fontSize={7}
              marginBottom={2}
            >
              {t('header.subTitle')}
            </Typography>
          </Stack>
        </Stack>
        <LanguageToggle />
      </Stack>
    </Container>
  );
};

export default Header;
