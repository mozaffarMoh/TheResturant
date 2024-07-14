'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home-page';
import AboutUsSection from '@/sections/home-page/about-us/aboutUsSection';
import ServicesSection from '@/sections/home-page/services-section/servicesSection';
import AuthFooter from '@/components/AuthFooter';
import PartnerSection from '@/sections/home-page/partner/PartnerSection';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <PartnerSection />
      <AuthFooter />
    </>
  );
};

export default HomePage;
