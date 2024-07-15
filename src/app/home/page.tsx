'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home-page';
import AboutUsSection from '@/sections/home-page/about-us/aboutUsSection';
import ServicesSection from '@/sections/home-page/services-section/servicesSection';
import AuthFooter from '@/components/AuthFooter';

import CardsSection from '@/components/home-page/cards-section/cardsSection';
import UnderCardsSection from '@/components/home-page/under-cards-section/underCardsSection';

import PartnerSection from '@/sections/home-page/partner/PartnerSection';
import ContactUsSection from '@/sections/home-page/contact-us/contactUsSection';


const HomePage: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      <CardsSection />
      
      <AboutUsSection />
      <ServicesSection />
      <PartnerSection />
      <ContactUsSection />
      <AuthFooter />
    </>
  );
};

export default HomePage;
