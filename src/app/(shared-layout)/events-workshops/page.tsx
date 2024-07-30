'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import EventsSection from '@/sections/home/events/eventsSection';
import GridFlex from '@mui/material/Unstable_Grid2';
import { Breadcrumbs, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import WorkShopsListingSection from '@/sections/events-workshops/workShopsListingSection';
import { textSecondaryColor } from '@/constant/color';

const EventsWorkShopsPage: NextPage = () => {
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
          <p className="general-title primary-color">Events & Workshops</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/home"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/events-workshops"
            >
              <Typography color={textSecondaryColor}>
                Events & Workshops
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>

      <EventsSection title={'Top Events'} />
      <WorkShopsListingSection />
    </>
  );
};

export default EventsWorkShopsPage;
