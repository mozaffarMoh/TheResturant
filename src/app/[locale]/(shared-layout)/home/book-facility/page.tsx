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
} from '@mui/material';
import Link from '@mui/material/Link';
import FacilityListingSection from '@/sections/book-facility/FacilityListingSection';
import React, { useEffect, useState } from 'react';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import Cookies from 'js-cookie';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';

const BookFacilityPage: NextPage = () => {
  const t = useTranslations();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [page, setPage] = useState(0);
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
    useGet(endPoints.getCitiesList + 'Amman');
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
      page == 0 ? setPage(1) : getFacilityItems();
    }
  }, [category, location]);

  useEffect(() => {
    page > 0 && getFacilityItems();
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
              href={`/${langCookie}/home`}
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
          <Box
            display="flex"
            alignItems="center"
          >
            <InputLabel
              id="dropdown-category"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: 'auto',
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
              style={{ marginLeft: 5, minWidth: 150 }}
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
                      key={item.id}
                      value={item.slug}
                    >
                      {item.key_word}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box
            display="flex"
            alignItems="center"
          >
            <InputLabel
              id="dropdown-location"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: 'auto',
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
              style={{ marginLeft: 5, minWidth: 150 }}
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
          </Box>
        </Grid>
      </Container>
      {/* Facility Listing Section */}

      {loadingFacilityItems ? (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          height={300}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <FacilityListingSection facilityItems={facilityItems} />
      )}
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
    </>
  );
};

export default BookFacilityPage;
