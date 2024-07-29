'use client';
import './page.css';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Container,
} from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import AnnounceSection from '@/sections/announcments/AnnounceSection';
import JobOfferingSection from '@/sections/announcments/JobOfferingSection';

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
          <Typography
            fontFamily={'Nobile'}
            marginBottom={2}
            fontSize={1}
            className="general-title primary-color"
          >
            ANNOUNCMENTS
          </Typography>
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
              <Typography color={'red'}>Announcments</Typography>
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
