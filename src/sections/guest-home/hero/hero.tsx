'use client';
import { domain } from '@/base-api/endPoints';
import styles from './hero.module.css';
import { Container } from '@mui/material';
import { DefautImage1Large } from '@/constant/images';
import { usePathname } from 'next/navigation';

const HeroSection = ({ data }: any) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  let imageURL =
    data && data.media && data.media.length > 0 && data.media[0]?.url
      ? domain + data?.media[0]?.url
      : DefautImage1Large;

  const words = data?.value?.split(' ') || [];
  return (
    <div
      className={styles.home}
      style={{
        backgroundImage: `url('${imageURL}')`,
      }}
      id="home"
    >
      {' '}
      <div className={styles.heroBrightness} />
      <div
        className={styles.heroTitle}
        style={{ left: !isArabic ? '8%' : '', right: isArabic ? '8%' : '' }}
      >
        <Container>
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
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
