'use client';
import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import EventsSection from '@/sections/home/events/eventsSection';
import MentorsSection from '@/sections/home/mentors/mentorsSection';
import NewsSection from '@/sections/home/news/NewsSection';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const HomePage: NextPage = () => {
  const t = useTranslations();
  const [data, loading, getData] = useGet(endPoints.homePage);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  return (
    <>
      {isClientSide && (
        <head>
          <title>{t('metadata.home')}</title>
          <meta
            name="description"
            content="Welcome to the Home page of The Platform Website."
          />
        </head>
      )}
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
