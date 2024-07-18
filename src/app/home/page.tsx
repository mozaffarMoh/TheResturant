'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { Header, HeroSection } from '@/sections/home';

import EventsSection from '@/sections/home/events/eventsSection';
import WorkShopsSection from '@/sections/home/workshops/workShopsSection';
import MentorsSection from '@/sections/home/mentors/mentorsSection';
import Footer from '@/components/footer/Footer';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <EventsSection />
      <WorkShopsSection />
      <MentorsSection />
      <Footer />
    </>
  );
};

export default HomePage;
