'use client';
import './page.css';
import {
  Box,
  Grid,
  Pagination,
  Typography,
  Breadcrumbs,
  Container,
  Stack,
} from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import NewsImage1 from '../../../../../../public/industry/news/news1.png';
import NewsImage2 from '../../../../../../public/industry/news/news2.png';
import NewsImage3 from '../../../../../../public/industry/news/news3.png';
import Image from 'next/image';
import { gray300, primaryColor } from '@/constant/color';
import IndustryNewsModal from '@/components/modals/industry-news-modal';
import { useState } from 'react';

const News = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const newsArray = [
    {
      image: NewsImage1,
      title: ' The Complete JavaScript Course 2020: Build Real Projects!',
      content:
        'Convallis vitae, nunc ut venenatis, lectus. Tellus nunc orci dolor nec facilisis et lacus, eu aliquet. Amet imperdiet ac venenatis, lacus. Tortor interdum quisque et, eu etiam ac.',
    },
    {
      image: NewsImage2,
      title: ' The Complete JavaScript Course 2020: Build Real Projects!',
      content:
        'Convallis vitae, nunc ut venenatis, lectus. Tellus nunc orci dolor nec facilisis et lacus, eu aliquet. Amet imperdiet ac venenatis, lacus. Tortor interdum quisque et, eu etiam ac.',
    },
    {
      image: NewsImage3,
      title: ' The Complete JavaScript Course 2020: Build Real Projects!',
      content:
        'Convallis vitae, nunc ut venenatis, lectus. Tellus nunc orci dolor nec facilisis et lacus, eu aliquet. Amet imperdiet ac venenatis, lacus. Tortor interdum quisque et, eu etiam ac.',
    },
  ];
  const tagsItems = [
    'Art',
    'Exercise',
    'Material Design ',
    'Software Development',
    'Music',
    'Photography',
  ];
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
            className="general-title primary-color"
            marginBottom={2}
          >
            News
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
              <Typography color={'red'}>News</Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      <Container>
        <Stack
          direction={'row'}
          className="news-details"
        >
          <Grid
            spacing={3}
            flexDirection={'column'}
            className="news-items"
          >
            {newsArray.map((item: any) => {
              return (
                <Stack
                  className="news-item"
                  justifyContent={'flex-start'}
                  direction={'row'}
                  spacing={3}
                  onClick={() => setIsDetailsVisible(true)}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Image
                    src={item.image}
                    alt="NewsImage"
                    className="news-image"
                  />

                  <Stack
                    justifyContent={'center'}
                    className="news-details-text"
                  >
                    <Typography
                      variant="h6"
                      color={primaryColor}
                      fontFamily={'Jost'}
                      fontWeight={'500'}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={primaryColor}
                      fontFamily={'Jost'}
                      fontWeight={'400'}
                    >
                      {item.content}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Grid>
          <Grid
            item
            lg={3}
            sm={4}
            className="news-tags"
          >
            <Box
              border={`1px solid #E7E7EC`}
              borderRadius={'25px'}
              padding={2}
            >
              <Typography
                variant="h6"
                color={primaryColor}
                fontWeight={600}
              >
                Tags
              </Typography>
              <Box padding={1}>
                {tagsItems.map((item: string) => {
                  return (
                    <Typography
                      variant="body1"
                      color={gray300}
                      lineHeight={2}
                    >
                      {item}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Stack>
      </Container>
      <Pagination
        count={3}
        color={'secondary'}
        sx={{ margin: '50px 0px 50px 0px' }}
      />
      <IndustryNewsModal
        open={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
      />
    </Grid>
  );
};

export default News;
