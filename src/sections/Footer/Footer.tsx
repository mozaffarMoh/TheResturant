'use client';
import { thirdColor } from '@/constant/color';
import { logoImage } from '@/constant/images';
import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations();
  const links = [t('footer.website'), t('footer.phone'), t('footer.address')];
  const isScreen600 = useMediaQuery('(max-width:600px)');
  return (
    <Container maxWidth="lg">
      <Stack
        direction={isScreen600 ? 'column' : 'row'}
        gap={isScreen600 ? 0.5 : 2}
        paddingY={2}
      >
        {links.map((item, i) => {
          return (
            <Typography
              key={i}
              variant="caption"
              fontSize={isScreen600 ? 9 : 13}
              color={thirdColor}
            >
              {item}
              {i == 1 && (
                <bdi style={{ direction: 'ltr' }}>+966(55)3696969</bdi>
              )}
            </Typography>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Footer;
