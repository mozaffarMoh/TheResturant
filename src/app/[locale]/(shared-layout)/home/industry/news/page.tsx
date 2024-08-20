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
  PaginationItem,
  CircularProgress,
} from '@mui/material';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import { gray300, primaryColor, textSecondaryColor } from '@/constant/color';
import IndustryNewsModal from '@/components/modals/industry-news-modal';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { domain, endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { DefautImage1 } from '@/constant/images';

const News = () => {
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [category, setCategory] = useState('all');
  const [slug, setSlug] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const filters: any = {
    'itemType.slug': 'News',
    ...(category !== 'all' && { 'categories.slug': category }),
  };
  const body = {
    modelName: 'Item',
    filters,
    fields: ['slug', 'title', 'subTitle', 'media'],
    add_fields: {
      categories: 'first,name,category',
    },
    'with-pagination': true,
    limit: 3,
    page: page,
  };
  const bodyCategory = {
    modelName: 'Category',

    filters: {
      'groups.slug': 'news-categories',
    },

    fields: ['id', 'name', 'slug'],
  };

  const [data, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
  );

  const [categories, , getCategories] = usePost(
    endPoints.DynamicFilter,
    bodyCategory,
  );

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  const handleShowItem = (slug: string) => {
    setIsDetailsVisible(true);
    setSlug(slug);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getData();
  }, [page, category]);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 3);
      setTotal(paginationCount);
    }
  }, [success]);

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
              href={`/${langCookie}/home`}
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
            {loading && (
              <Stack
                height={700}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <CircularProgress />
              </Stack>
            )}
            {data &&
              !loading &&
              data.map((item: any) => {
                let imageURL =
                  item.media.length > 0 && item.media[0]?.url
                    ? domain + item.media[0]?.url
                    : DefautImage1;
                return (
                  <Stack
                    className="news-item"
                    justifyContent={'flex-start'}
                    direction={'row'}
                    onClick={() => handleShowItem(item?.slug)}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <img
                      src={imageURL}
                      alt="NewsImage"
                      className="news-image"
                    />

                    <Stack
                      justifyContent={'flex-start'}
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
                        {item.subTitle}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={textSecondaryColor}
                      >
                        {item.category}
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
                  <Typography
                    variant="body1"
                    lineHeight={2}
                    color={category == 'all' ? 'red' : gray300}
                    sx={{
                      '&:hover': { color: 'red', cursor: 'pointer' },
                    }}
                    onClick={() => setCategory('all')}
                  >
                    {t('select.all')}
                  </Typography>
                  {categories &&
                    categories.map((item: any, i: number) => {
                      return (
                        <Typography
                          key={i}
                          variant="body1"
                          lineHeight={2}
                          color={item.slug == category ? 'red' : gray300}
                          sx={{
                            '&:hover': { color: 'red', cursor: 'pointer' },
                          }}
                          onClick={() => setCategory(item.slug)}
                        >
                          {item.name}
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
                {t('select.tags')} :&nbsp;
              </InputLabel>
              <FormControl
                variant="outlined"
                style={{ marginLeft: 5, minWidth: 150 }}
              >
                <Select
                  labelId="dropdown-tags"
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  sx={{
                    borderRadius: '1.5rem',
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '8px 14px',
                    },
                  }}
                >
                  {' '}
                  <MenuItem value={'all'}>
                    <Typography color={category == 'all' ? 'red' : ''}>
                      {t('select.all')}
                    </Typography>
                  </MenuItem>
                  {categories &&
                    categories.map((item: any, i: number) => {
                      return (
                        <MenuItem value={item.slug}>
                          <Typography
                            color={item.slug == category ? 'red' : ''}
                          >
                            {item?.name}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>{' '}
            </Stack>
          )}
        </Stack>
      </Container>
        <Stack
          alignItems={'center'}
          paddingBottom={10}
          marginTop={6}
        >
          <Pagination
            onChange={handleChange}
            page={page}
            color="primary"
            count={total}
            siblingCount={2} // Number of siblings to show around the current page
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: isArabic
                    ? ArrowForwardIosRounded
                    : ArrowBackIosNewRounded,
                  next: isArabic
                    ? ArrowBackIosNewRounded
                    : ArrowForwardIosRounded,
                }}
              />
            )}
          />
        </Stack>
      <IndustryNewsModal
        open={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
        slug={slug}
        setSlug={setSlug}
      />
    </Grid>
  );
};

export default News;
