'use client';

import type { NextPage } from 'next';
import EventsSection from '@/sections/home/events/eventsSection';
import GridFlex from '@mui/material/Unstable_Grid2';
import { Breadcrumbs, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import WorkShopsListingSection from '@/sections/events-workshops/workShopsListingSection';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventsWorkShopsPage: NextPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const langCurrent = pathname.slice(1, 3) || 'en';
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  },[])

  return (
    <>
      {isClientSide && (
        <head>
          <title>The Platform | Events-Workshop</title>
          <meta
            name="description"
            content="Welcome to the Events and Workshops page of The Platform Website"
          />
        </head>
      )}
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <p className="general-title primary-color">
            {t('header.events-workshops')}
          </p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href={`/${langCurrent}/home`}
            >
              {t('header.home')}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              <Typography color={textSecondaryColor}>
                {t('header.events-workshops')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>

      <EventsSection title={t('header.events-top')} />
      <WorkShopsListingSection />
    </>
  );
};

export default EventsWorkShopsPage;
