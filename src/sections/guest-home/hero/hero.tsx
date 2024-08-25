'use client';
import { domain } from '@/base-api/endPoints';
import styles from './hero.module.css';
import { Container, Skeleton, Stack, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';

const HeroSection = ({ data, loading }: any) => {
  const pathname = usePathname();
  const isScreen450 = useMediaQuery('(max-width:450px)');
  let isArabic = pathname.startsWith('/ar');
  let imageURL =
    data && data.media && data.media.length > 0 && data.media[0]?.url
      ? domain + data?.media[0]?.url
      : '';

  const words = data?.value?.split(' ') || [];
  return (
    <div
      className={styles.home}
      style={{
        backgroundImage: `url('${imageURL}')`,
      }}
      id="home"
    >
      {loading && (
        <Skeleton
          sx={{ height: '100%' }}
          width={'100%'}
          animation="wave"
          variant="rectangular"
        />
      )}{' '}
      <div className={styles.heroBrightness} />
      <div
        className={styles.heroTitle}
        style={{ left: !isArabic ? '8%' : '', right: isArabic ? '8%' : '' }}
      >
        <Container>
          {loading ? (
            <Stack width={isScreen450 ? '230px' : '350px'}>
              <Skeleton
                sx={{ bgcolor: 'grey.500' }}
                variant="text"
                width="100%"
                height="40px"
              />
              <Skeleton
                sx={{ bgcolor: 'grey.500' }}
                variant="text"
                width="80%"
                height="40px"
              />
              <Skeleton
                sx={{ bgcolor: 'grey.500' }}
                variant="text"
                width="70%"
                height="40px"
              />
            </Stack>
          ) : (
            <p className={styles.welcomeToTheTheplatformYou}>
              {words.map((word: string, index: number) =>
                index === 3 ? (
                  <span
                    key={index}
                    style={{ color: '#EB6B2A' }}
                  >
                    {word}{' '}
                  </span>
                ) : (
                  `${word} `
                ),
              )}
            </p>
          )}
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
