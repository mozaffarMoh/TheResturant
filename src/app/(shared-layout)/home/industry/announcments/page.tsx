'use client';
import './page.css';
import { Grid, Typography, Breadcrumbs, Container } from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import AnnounceSection from '@/sections/announcments/AnnounceSection';
import JobOfferingSection from '@/sections/announcments/JobOfferingSection';
import { textSecondaryColor } from '@/constant/color';

const News = () => {
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      className="news"
    >
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <p className="general-title primary-color">ANNOUNCMENTS</p>
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
            >
              The Industry
            </Link>{' '}
            <Link
              underline="hover"
              color="inherit"
              href="/home/industry/news"
            >
              <Typography color={textSecondaryColor}>Announcments</Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      <AnnounceSection />
      <JobOfferingSection />
    </Grid>
  );
};

export default News;
