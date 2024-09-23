'use client';
import {
  appleStoreButton,
  googlePlayButton,
  logoLargeImage,
  phonesImage,
} from '@/constant/images';
import styles from './hero.module.css';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { blackButton } from '@/constant/color';

const HeroSection = () => {
  const pathname = usePathname();
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const isScreen900 = useMediaQuery('(max-width:900px)');
  let isArabic = pathname.startsWith('/ar');
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
                  The best app for booking chalets and resorts effortlessly,
                  with customized options and a seamless booking experience
                </Typography>
              </Box>
              <Stack
                height={50}
                direction={'row'}
                gap={1}
              >
                <Button
                  sx={{
                    background: blackButton,
                    padding: 3,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={googlePlayButton}
                    width={isScreen450 ? 80 : 120}
                    height={isScreen450 ? 20 : 30}
                    alt="google-play-button"
                  />
                </Button>
                <Button
                  sx={{
                    background: blackButton,
                    padding: 3,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={appleStoreButton}
                    width={isScreen450 ? 80 : 120}
                    height={isScreen450 ? 20 : 30}
                    alt="apple-store"
                  />
                </Button>
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
