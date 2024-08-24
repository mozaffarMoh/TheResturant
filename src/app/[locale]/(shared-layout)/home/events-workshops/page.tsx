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

const EventsWorkShopsPage: NextPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const langCurrent = pathname.slice(1, 3) || 'en';

  return (
    <>
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
