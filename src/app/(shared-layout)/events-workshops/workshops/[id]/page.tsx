'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { HeroSection } from '@/sections/home';
import { workShopBanner } from '@/constant/images';
import WorkShopDetailsSection from '@/sections/events-workshops/workShopDetailsSection';

const HomePage: NextPage = () => {
  return (
    <>
      <HeroSection
        bannerImage={workShopBanner}
        noText
      />
      <WorkShopDetailsSection />
    </>
  );
};

export default HomePage;
