'use client';
import { domain } from '@/base-api/endPoints';
import styles from './hero.module.css';
import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import { DefautImage1Large } from '@/constant/images';

const HeroSection = ({ data }: any) => {
  let imageURL =
    data && data.media && data.media.length > 0 && data.media[0]?.url
      ? domain + data?.media[0]?.url
      : DefautImage1Large;

  const words = data?.value?.split(' ') || [];
  return (
    <div
      className={styles.home}
      style={{
        backgroundImage: `url('${imageURL}'),linear-gradient(to right, #3f485eff,#3f485eff)`,
      }}
      id="home"
    >
      <div className={styles.heroTitle}>
        <Container>
          <p className={styles.welcomeToTheTheplatformYou}>
            {words.map((word: string, index: number) =>
              index === 3 ? (
                <span
                  key={index}
                  style={{ color: 'red' }}
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
