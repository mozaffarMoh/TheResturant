'use client';
import {
  appleIcon,
  googleIcon,
  logoLargeImage,
  phonesImage,
} from '@/constant/images';
import styles from './hero.module.css';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { blackButton } from '@/constant/color';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations();
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const isScreen900 = useMediaQuery('(max-width:900px)');
  return (
    <div
      className={styles.hero}
      id="hero"
    >
      <Container className={styles.heroContainer}>
        <Grid
          container
          height={'700px'}
          spacing={isScreen900 ? 5 : 0}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack
              alignItems={'center'}
              textAlign={'center'}
              justifyContent={'center'}
              height={'100%'}
              gap={4}
            >
              <Image
                width={isScreen450 ? 200 : 300}
                height={isScreen450 ? 65 : 100}
                src={logoLargeImage}
                alt="logo"
              />
              <Box width={isScreen450 ? 250 : 400}>
                <Typography
                  variant="body2"
                  fontSize={16}
                  color={'white'}
                >
                  {t('subTitles.hero')}
                </Typography>
              </Box>
              <Stack
                height={50}
                direction={isScreen450 ? 'column' : 'row'}
                gap={1}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  padding={isScreen450 ? 1 : 3}
                  paddingX={3}
                  borderRadius={10}
                  color={'white'}
                  bgcolor={blackButton}
                  gap={1}
                  className={styles.storeButton}
                  sx={{ cursor: 'pointer' }}
                >
                  <Image
                    src={googleIcon} // Replace with your image path
                    alt="google play Store"
                    width={24}
                    height={26}
                  />
                  <Stack textAlign={'left'} >
                    <Typography fontSize={9}>GET IT ON</Typography>
                    <Typography
                      lineHeight={1}
                      fontSize={15}
                    >
                      Google Play
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  className={styles.storeButton}
                  padding={isScreen450 ? 1 : 3}
                  borderRadius={9}
                  color={'white'}
                  bgcolor={blackButton}
                  gap={1}
                  sx={{ cursor: 'pointer' }}
                >
                  <Image
                    src={appleIcon} // Replace with your image path
                    alt="Apple App Store"
                    width={24}
                    height={26}
                  />
                  <Stack>
                    <Typography fontSize={10}>Download on the</Typography>
                    <Typography
                      lineHeight={1}
                      fontSize={15}
                    >
                      App Store
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack
              height={'100%'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image
                width={isScreen450 ? 250 : 400}
                height={isScreen450 ? 250 : 400}
                src={phonesImage}
                alt="logo"
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HeroSection;
