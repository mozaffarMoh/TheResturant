'use client';

import type { NextPage } from 'next';
import styles from './hero.module.css';
import { Container } from '@mui/material';

const HeroSection: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.heroTitle}>
        <Container>
          <p className={styles.Title}>Learn From Anywhere</p>
          <p className={styles.SubTitle}>
            Technology is brining a massive wave of evolution on learning things
            on different ways.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
