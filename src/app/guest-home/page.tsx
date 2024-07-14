'use client';

import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from './page.module.css';
import { Header, HeroSection } from '@/components/home-page';
import AboutUsSection from '@/components/home-page/about-us/aboutUsSection';
import ServicesSection from '@/components/home-page/services-section/servicesSection';

const GuestHome: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
    </>
  );
};

export default GuestHome;
