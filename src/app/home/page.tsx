'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/components/home-page';
import AboutUsSection from '@/components/home-page/about-us/aboutUsSection';
import ServicesSection from '@/components/home-page/services-section/servicesSection';
import AuthFooter from '@/components/AuthFooter';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <AuthFooter />
    </>
  );
};

export default HomePage;
