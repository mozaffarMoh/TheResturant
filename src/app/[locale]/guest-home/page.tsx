'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { HeroSection } from '@/sections/guest-home';
import AboutUsSection from '@/sections/guest-home/about-us/aboutUsSection';
import ServicesSection from '@/sections/guest-home/services-section/servicesSection';
import AuthFooter from '@/components/auth-footer/AuthFooter';

import CardsSection from '@/components/home-page/cards-section/cardsSection';
import UnderCardsSection from '@/components/home-page/under-cards-section/underCardsSection';

import PartnerSection from '@/sections/guest-home/partner/PartnerSection';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';
import GuestHeader from '@/sections/guest-home/guest-header/guest-header';

const PublicHomePage: NextPage = () => {
  return (
    <>
      <GuestHeader />

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

export default PublicHomePage;
