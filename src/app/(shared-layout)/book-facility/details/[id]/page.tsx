'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { HeroSection } from '@/sections/home';
import { workShopBanner } from '@/constant/images';

import FacilityDetailsSection from '@/sections/book-facility/FacilityDetailsSection';

const FacilityDetailsPage: NextPage = () => {
  return (
    <>
      <HeroSection
        bannerImage={workShopBanner}
        noText
      />
      <FacilityDetailsSection />
    </>
  );
};

export default FacilityDetailsPage;
