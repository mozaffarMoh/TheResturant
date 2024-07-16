'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home';
import AboutUsSection from '@/sections/guest-home/about-us/aboutUsSection';
import ServicesSection from '@/sections/guest-home/services-section/servicesSection';
import AuthFooter from '@/components/AuthFooter';

import CardsSection from '@/components/home-page/cards-section/cardsSection';
import UnderCardsSection from '@/components/home-page/under-cards-section/underCardsSection';

import PartnerSection from '@/sections/guest-home/partner/PartnerSection';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <AboutUsSection /> */}

      <AuthFooter />
    </>
  );
};

export default HomePage;
