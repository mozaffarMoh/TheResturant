'use client';

import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from './page.module.css';
import { Header, HeroSection } from '@/components/home-page';
import AboutUsSection from '@/components/home-page/about-us/aboutUsSection';

const GuestHome: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      <AboutUsSection />
    </>
  );
};

export default GuestHome;
