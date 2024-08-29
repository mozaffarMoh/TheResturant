'use client';
import './page.css';
import { Grid, Typography, Breadcrumbs, Container } from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import AnnounceSection from '@/sections/announcments/AnnounceSection';
import JobOfferingSection from '@/sections/announcments/JobOfferingSection';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const Announcments = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const langCurrent = pathname.slice(1, 3) || 'en';
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
    >
      {' '}
      {isClientSide && (
        <head>
          <title>{t('metadata.announcements')}</title>
          <meta
            name="description"
            content="Welcome to the Announcements page of The Platform Website"
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
            {' '}
            {t('header.announcements')}
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
            >
              {t('header.industry')}
            </Link>{' '}
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              <Typography color={textSecondaryColor}>
                {t('header.announcements')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      <AnnounceSection />
      <JobOfferingSection />
    </Grid>
  );
};

export default Announcments;
