'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Container } from '@mui/material';

const HeroSection: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.heroTitle}>
        <Container>
          <p className={styles.welcomeToTheTheplatformYou}>
            Welcome to The{' '}
            <span className={styles.theplatform}>ThePlatform</span> Your
            Platform for Launching Towards Technological Success!
          </p>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
