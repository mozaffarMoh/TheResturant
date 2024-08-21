'use client';
import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import EventsSection from '@/sections/home/events/eventsSection';
import WorkShopsSection from '@/sections/home/workshops/workShopsSection';
import MentorsSection from '@/sections/home/mentors/mentorsSection';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const t = useTranslations();
  const [data, , getData] = useGet(endPoints.homePage);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeroSection data={data} />
      <EventsSection title={t('header.events')} />
      <WorkShopsSection />
      <MentorsSection />
    </>
  );
};

export default HomePage;
