'use client';
import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import EventsSection from '@/sections/home/events/eventsSection';
import MentorsSection from '@/sections/home/mentors/mentorsSection';
import NewsSection from '@/sections/home/news/NewsSection';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const t = useTranslations();
  const [data, loading, getData] = useGet(endPoints.homePage);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeroSection
        data={data}
        loading={loading}
      />
      <EventsSection title={t('header.events')} />
      <NewsSection />
      <MentorsSection />
    </>
  );
};

export default HomePage;
