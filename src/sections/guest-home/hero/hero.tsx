'use client';

import type { NextPage } from 'next';
import styles from './hero.module.css';
import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

const HeroSection: NextPage = () => {
  const t = useTranslations();
  return (
    <div className={styles.home}>
      <div className={styles.heroTitle}>
        <Container>
          <p className={styles.welcomeToTheTheplatformYou}>
            {t('guest-home.hero1')}
            <span className={styles.theplatform}>
              {' '}
              {t('guest-home.hero-span')}
            </span>{' '}
            {t('guest-home.hero2')}
          </p>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
