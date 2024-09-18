'use client';

import type { NextPage } from 'next';
import GridFlex from '@mui/material/Unstable_Grid2';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
  useMediaQuery,
} from '@mui/material';
import Link from '@mui/material/Link';
import FacilityListingSection from '@/sections/book-facility/FacilityListingSection';
import React, { useEffect, useState } from 'react';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';
import CardSkeleton from '@/components/skeleton/cardSkeleton';
import NoData from '@/components/NoData/NoData';

const BookFacilityPage: NextPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const isScreen565 = useMediaQuery('(max-width:565px)');
  const langCurrent = pathname?.slice(1, 3) || 'en';
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isClientSide, setIsClientSide] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const filters: any = {
    'itemType.slug': 'facility',
    ...(location !== 'all' && { 'place.slug': location }),
    ...(category !== 'all' && { 'categories.slug': category }),
  };

  const body = {
    modelName: 'Item',
    fields: ['id', 'title', 'slug', 'description', 'price_start_from', 'media'],
    relations: {
      itemMetaData: {
        fields: ['id', 'value'],
        relations: {
          itemMetaKey: {
            fields: ['id', 'name', 'slug', 'media'],
          },
          time: {},
        },
      },
      categories: {
        fields: ['name'],
      },
      place: {
        fields: ['name', 'slug'],
        relations: {
          parent: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    'with-pagination': true,
    limit: 9,
    page: page,
    filters,
  };

  const [
    facilityList,
    loadingFacilityList,
    getFacilityList,
    successFacilityList,
  ] = useGet(endPoints.getFacilityList);

  const [citiesList, loadingCitiesList, getCitiesList, successCitiesList] =
    useGet(endPoints.getCitiesList + 'jordan');

  const [
    facilityItems,
    loadingFacilityItems,
    getFacilityItems,
    successFacilityItems,
    ,
    ,
    ,
    facilityItemsFullData,
  ] = usePost(endPoints.DynamicFilter, body);

  useEffect(() => {
    getFacilityList();
    getCitiesList();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (successFacilityList && successCitiesList) {
      setCategory('all');
      setLocation('all');
    }
  }, [successFacilityList, successCitiesList]);

  /* Get items when location and category be ready also with every change */
  useEffect(() => {
    if (category && location) {
      page > 1 ? setPage(1) : getFacilityItems();
    }
  }, [category, location]);

  useEffect(() => {
    getFacilityItems();
  }, [page]);

  useEffect(() => {
    if (successFacilityItems) {
      let totalNum = facilityItemsFullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 9);
      setTotal(paginationCount);
    }
  }, [successFacilityItems]);

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      {isClientSide && (
        <head>
          <title>{t('metadata.book_facility')}</title>
          <meta
            name="description"
            content="Welcome to the Book-Facility page of The Platform Website"
          />
        </head>
      )}
      {/* BreadCrumb Section */}
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
            {t('header.book-facility')}
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
              href="#"
            >
              <Typography color={textSecondaryColor}>
                {' '}
                {t('header.book-facility')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      {/* Category Buttons Filter By */}
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="end"
          alignItems="center"
          className="mt-2"
          gap={{
            xs: 1,
            sm: 3,
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={isScreen565 ? '100%' : 'auto'}
          >
            <InputLabel
              id="dropdown-category"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: loadingFacilityList ? ' 120px' : '80px',
              }}
            >
              {t('select.category')} :&nbsp;&nbsp;
              {loadingFacilityList && (
                <CircularProgress
                  size={20}
                  color="primary"
                  sx={{ marginX: 1, marginTop: 1 }}
                />
              )}
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ minWidth: 150 }}
            >
              {' '}
              <Select
                labelId="dropdown-category"
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
                <MenuItem value={'all'}>{t('select.all')}</MenuItem>
                {facilityList.map((item: any) => {
                  return (
                    <MenuItem
                      key={item?.id}
                      value={item?.slug}
                    >
                      {item?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={isScreen565 ? '100%' : 'auto'}
          >
            <InputLabel
              id="dropdown-location"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: loadingCitiesList ? ' 120px' : '80px',
              }}
            >
              {t('select.location')} :&nbsp;&nbsp;
              {loadingCitiesList && (
                <CircularProgress
                  size={20}
                  color="primary"
                  sx={{ marginX: 1, marginTop: 1 }}
                />
              )}
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ minWidth: 150 }}
            >
              <Select
                labelId="dropdown-location"
                value={location}
                onChange={(e: any) => setLocation(e.target.value)}
                sx={{
                  borderRadius: '1.5rem',
                  height: '40px',
                  '& .MuiSelect-select': {
                    padding: '8px 14px',
                  },
                }}
              >
                <MenuItem value={'all'}>{t('select.all')}</MenuItem>
                {citiesList?.children &&
                  citiesList?.children.map((item: any) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.slug}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Container>
      {/* Facility Listing Section */}
      {facilityItems?.length == 0 && successFacilityItems && <NoData />}
      {loadingFacilityItems || loadingCitiesList || loadingFacilityList ? (
        <Stack
          gap={2}
          paddingY={10}
          direction={'row'}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Stack>
      ) : (
        <FacilityListingSection facilityItems={facilityItems} />
      )}
      {facilityItems?.length > 0 && (
        <Stack
          alignItems={'center'}
          paddingBottom={10}
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
    </>
  );
};

export default BookFacilityPage;
