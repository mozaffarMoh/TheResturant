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
import { domain, endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { DefautImage1 } from '@/constant/images';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import NoData from '@/components/NoData/NoData';
import Image from 'next/image';

const News = () => {
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname?.slice(1, 3) || 'en';
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [category, setCategory] = useState('all');
  const [renderedCategory, setRenderedCategory] = useState(t('select.all'));
  const [slug, setSlug] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isClientSide, setIsClientSide] = useState(false);
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

  const [categories, loadingCategories, getCategories, successCategories] =
    usePost(endPoints.DynamicFilter, bodyCategory);

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  const handleShowItem = (slug: string) => {
    setIsDetailsVisible(true);
    setSlug(slug);
  };

  useEffect(() => {
    getCategories();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    getData();
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 3);
      setTotal(paginationCount);
    }
  }, [success]);

  const handleChangeCategory = (e: any) => {
    setCategory(e.target.value);
  };
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      className="news"
    >
      {isClientSide && (
        <head>
          <title>{t('metadata.news')}</title>
          <meta
            name="description"
            content="Welcome to the News page of The Platform Website"
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
          <p className="general-title primary-color">{t('header.news')}</p>
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
            {data?.length == 0 && success && <NoData />}
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i: number) => {
                    return (
                      <Stack
                        key={i}
                        gap={2}
                        paddingBottom={10}
                        direction={'row'}
                        flexWrap={'wrap'}
                        justifyContent={'space-evenly'}
                        width={'100%'}
                      >
                        {' '}
                        <Stack>
                          <CustomSkeleton
                            variant="rectangle"
                            width="300px"
                            height="200px"
                            borderRadius="20px"
                          />{' '}
                        </Stack>
                        <Stack
                          width={!isScreen450 ? '50%' : '100%'}
                          key={i}
                          alignItems={'flex-start'}
                        >
                          <CustomSkeleton width="150px" />
                          <CustomSkeleton width="250px" />
                          <CustomSkeleton width="300px" />
                        </Stack>
                      </Stack>
                    );
                  })
              : data &&
                data.map((item: any) => {
                  let imageURL = item?.media?.main_image?.[0]?.url
                    ? domain + item?.media?.main_image?.[0]?.url
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
                      <Box
                        sx={{
                          position: 'relative',
                          width: isScreen900 ? '100%' : '350px',
                          height: 350,
                        }}
                      >
                        <Image
                          fill
                          src={imageURL}
                          alt="NewsImage"
                          className="news-image"
                        />
                      </Box>

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
              marginBottom={2}
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
                  {loadingCategories ? (
                    Array(2)
                      .fill(0)
                      .map((_, i: number) => {
                        return (
                          <Stack key={i}>
                            <CustomSkeleton width="80px" />
                            <CustomSkeleton width="140px" />
                            <CustomSkeleton width="90px" />
                          </Stack>
                        );
                      })
                  ) : (
                    <div>
                      {successCategories && (
                        <Typography
                          variant="body1"
                          lineHeight={2}
                          color={category == 'all' ? '#EB6B2A' : gray300}
                          sx={{
                            '&:hover': { color: '#EB6B2A', cursor: 'pointer' },
                          }}
                          onClick={() => setCategory('all')}
                        >
                          {t('select.all')}
                        </Typography>
                      )}
                      {categories &&
                        categories.map((item: any, i: number) => {
                          return (
                            <Typography
                              key={i}
                              variant="body1"
                              lineHeight={2}
                              color={
                                item.slug == category ? '#EB6B2A' : gray300
                              }
                              sx={{
                                '&:hover': {
                                  color: '#EB6B2A',
                                  cursor: 'pointer',
                                },
                              }}
                              onClick={() => setCategory(item.slug)}
                            >
                              {item.name}
                            </Typography>
                          );
                        })}
                    </div>
                  )}
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
                  onChange={handleChangeCategory}
                  sx={{
                    borderRadius: '1.5rem',
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '8px 14px',
                    },
                  }}
                  renderValue={() => (
                    <Typography textTransform={'capitalize'}>
                      {renderedCategory}
                    </Typography>
                  )}
                >
                  {' '}
                  <MenuItem
                    value={'all'}
                    onClick={() => setRenderedCategory(t('select.all'))}
                  >
                    <Typography color={category == 'all' ? '#EB6B2A' : ''}>
                      {t('select.all')}
                    </Typography>
                  </MenuItem>
                  {categories &&
                    categories.map((item: any, i: number) => {
                      return (
                        <MenuItem
                          value={item?.slug}
                          onClick={() => setRenderedCategory(item?.name)}
                        >
                          <Typography
                            color={item.slug == category ? '#EB6B2A' : ''}
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
      {data?.length > 0 && (
        <Stack
          alignItems={'center'}
          paddingBottom={10}
          marginTop={6}
        >
          <Pagination
            onChange={handleChange}
            page={page}
            count={total}
            siblingCount={2} // Number of siblings to show around the current page
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: '#3F485E',
                  '&.Mui-selected': {
                    backgroundColor: '#3F485E',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#3F485EDD' },
                  },
                }}
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
      )}

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
