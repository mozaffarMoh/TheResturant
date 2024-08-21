'use client';
import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import EventsSection from '@/sections/home/events/eventsSection';
import WorkShopsSection from '@/sections/home/workshops/workShopsSection';
import MentorsSection from '@/sections/home/mentors/mentorsSection';
import { useTranslations } from 'next-intl';

const HomePage: NextPage = () => {
  const t = useTranslations();

  return (
    <>
      <HeroSection />
      <EventsSection title={t('header.events')} />
      <WorkShopsSection />
      <MentorsSection />
    </>
  );
};

export default HomePage;
