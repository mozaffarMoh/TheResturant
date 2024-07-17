'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home';

import AuthFooter from '@/components/AuthFooter';

import EventsSection from '@/sections/home/events/eventsSection';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <EventsSection />

      <AuthFooter />
    </>
  );
};

export default HomePage;
