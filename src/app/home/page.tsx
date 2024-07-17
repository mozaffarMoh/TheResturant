'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home';

import AuthFooter from '@/components/AuthFooter';

import EventsSection from '@/sections/home/events/eventsSection';
import WorkShopsSection from '@/sections/home/workshops/workShopsSection';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <EventsSection />
      <WorkShopsSection />
      <AuthFooter />
    </>
  );
};

export default HomePage;
