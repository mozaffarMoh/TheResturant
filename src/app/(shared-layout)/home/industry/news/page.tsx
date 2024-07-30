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
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import NewsImage1 from '../../../../../../public/industry/news/news1.png';
import NewsImage2 from '../../../../../../public/industry/news/news2.png';
import NewsImage3 from '../../../../../../public/industry/news/news3.png';
import Image from 'next/image';
import { gray300, primaryColor, textSecondaryColor } from '@/constant/color';
import IndustryNewsModal from '@/components/modals/industry-news-modal';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const News = () => {
  const t = useTranslations();
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [tags, setTags] = useState<Number>(0);
  const tagsHandleChange = (event: React.ChangeEvent<{ value: Number }>) => {
    setTags(event.target.value as Number);
  };
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
          <p className="general-title primary-color">{t('header.news')}</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/home"
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
              href="/home/industry/news"
            >
              <Typography color={textSecondaryColor}>
                {t('header.news')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      <Container>
        <Stack
          direction={'row'}
          className="news-details"
          marginTop={10}
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
                    margin={2}
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
                    <Typography
                      variant="caption"
                      color={textSecondaryColor}
                    >
                      Art
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Grid>
          {!isScreen900 ? (
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
                  {t('select.tags')}
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
          ) : (
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              padding={3}
            >
              <InputLabel
                id="dropdown-tags"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  textOverflow: 'clip',
                  fontWeight: 600,
                  width: 'auto',
                }}
              >
                {t('select.tags')} :
              </InputLabel>
              <FormControl
                variant="outlined"
                style={{ marginLeft: 5, minWidth: 150 }}
              >
                <Select
                  labelId="dropdown-tags"
                  value={tags}
                  onChange={tagsHandleChange as any}
                  sx={{
                    borderRadius: '1.5rem',
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '8px 14px',
                    },
                  }}
                >
                  {tagsItems.map((item: string, i) => {
                    return <MenuItem value={i}>{item}</MenuItem>;
                  })}
                </Select>
              </FormControl>{' '}
            </Stack>
          )}
        </Stack>
      </Container>
      <Pagination
        count={3}
        color={'secondary'}
        sx={{ margin: '50px 0px 50px 0px' }}
        dir="ltr"
      />
      <IndustryNewsModal
        open={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
      />
    </Grid>
  );
};

export default News;
