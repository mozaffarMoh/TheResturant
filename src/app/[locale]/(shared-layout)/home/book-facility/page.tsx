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
} from '@mui/material';
import Link from '@mui/material/Link';
import FacilityListingSection from '@/sections/book-facility/FacilityListingSection';
import React, { useEffect, useState } from 'react';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import Cookies from 'js-cookie';
import usePost from '@/custom-hooks/usePost';

const BookFacilityPage: NextPage = () => {
  const t = useTranslations();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const filters: any = {
    'itemType.slug': 'facility',
    'place.slug': 'amman', //location,
    ...(category !== 'all' && { 'categories.slug': category }),
  };

  const body = {
    modelName: 'Item',
    fields: ['id', 'title', 'slug', 'description', 'price_start_from','media'],
    relations: {
      itemMetaData: {
        fields: ['id', 'value'],
        relations: {
          itemMetaKey: {
            fields: ['id', 'name', 'slug', 'media'],
          },
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
    'with-pagination': false,
    limit: 2,
    page: 2,
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
  const [facilityItems, loadingFacilityItems, getFacilityItems] = usePost(
    endPoints.getFacilityItems,
    body,
  );

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
    category && location && getFacilityItems();
  }, [category, location]);

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
              {t('select.category')} :
              {loadingFacilityList && (
                <CircularProgress
                  size={20}
                  color="primary"
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
                      {item.name}
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
              {t('select.location')} :
              {loadingCitiesList && (
                <CircularProgress
                  size={20}
                  color="primary"
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
    </>
  );
};

export default BookFacilityPage;
