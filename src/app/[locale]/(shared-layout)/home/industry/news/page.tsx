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
import { DefautImage1Large } from '@/constant/images';

const News = () => {
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState<Number>(0);
  const body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'News',
    },
    fields: ['slug', 'title', 'subTitle', 'media', 'created_at', 'description'],
    add_fields: {
      categories: 'first,name,category',
    },
    'with-pagination': true,
    limit: 10,
    page: 1,
  };

  const [data, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
  );

  const tagsItems = [
    t('tags.Art'),
    t('tags.Exercise'),
    t('tags.Material Design'),
    t('tags.Software Development'),
    t('tags.Music'),
    t('tags.Photography'),
  ];
  const tagsHandleChange = (event: React.ChangeEvent<{ value: Number }>) => {
    setTags(event.target.value as Number);
  };

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  const handleShowItem = (data: any) => {
    setIsDetailsVisible(true);
    setSelectedData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    page > 0 && getData();
  }, [page]);

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
            {data &&
              data.map((item: any) => {
                let imageURL =
                  item.media.length > 0 && item.media[0]?.url
                    ? domain + item.media[0]?.url
                    : DefautImage1Large;
                return (
                  <Stack
                    className="news-item"
                    justifyContent={'flex-start'}
                    direction={'row'}
                    onClick={() => handleShowItem(item)}
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
                {t('select.tags')} :&nbsp;
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
      <Stack
        alignItems={'center'}
        paddingBottom={10}
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
        data={selectedData}
      />
    </Grid>
  );
};

export default News;
