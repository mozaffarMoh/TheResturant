'use client';

import styles from './hero.module.css';
import { Container } from '@mui/material';
import { homeHeroImage } from '@/constant/images';
import { domain } from '@/base-api/endPoints';

interface IProps {
  bannerImage?: string;
  noText?: boolean;
}
const HeroSection = ({
  bannerImage = homeHeroImage,
  noText = false,
}: IProps) => {

  return (
    <div
      className={styles.home}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className={styles.heroTitle}>
        {noText ? null : (
          <Container maxWidth="lg">
            <p className="general-title text-white-new max-w-md-65">
              Learn From Anywhere
            </p>
            <p className={styles.SubTitle}>
              Technology is brining a massive wave of evolution on learning
              things on different ways.
            </p>
          </Container>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
