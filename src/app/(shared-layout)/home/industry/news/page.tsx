'use client';
import './page.css';
import { Box, Grid, Pagination, Typography } from '@mui/material';
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
      spacing={10}
      padding={10}
      className="news"
    >
      <Grid
        item
        textAlign={'center'}
      >
        <Typography
          variant="h4"
          color={primaryColor}
          fontFamily={'Nobile'}
          fontWeight={'500'}
        >
          News
        </Typography>{' '}
        <Typography
          variant="caption"
          color={primaryColor}
          fontFamily={'Jost'}
          fontWeight={'400'}
        >
          Home / The Industry / <span style={{ color: 'red' }}>News</span>
        </Typography>
      </Grid>
      <Grid
        container
        item
        direction={'row'}
        width={'80%'}
        className="news-details"
      >
        <Grid
          container
          item
          lg={9}
          sm={8}
          spacing={3}
          flexDirection={'column'}
          className='news-items'
        >
          {newsArray.map((item: any) => {
            return (
              <Grid
                container
                item
                className="news-array-items"
                spacing={3}
                paddingRight={5}
                onClick={() => setIsDetailsVisible(true)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <Grid
                  item
                  xs={6}
                  display={'flex'}
                  justifyContent={'flex-end'}
                >
                  <Image
                    src={item.image}
                    alt="NewsImage"
                    className="news-image"
                  />
                </Grid>{' '}
                <Grid
                  item
                  xs={6}
                  direction={'column'}
                  justifyContent={'center'}
                  display={'flex'}
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
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          className="tags"
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
      </Grid>
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
