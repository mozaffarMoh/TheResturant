'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';

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
  let body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'facility',
      'place.slug': 'amman',
      'categories.slug': 'meeting-room',
    },
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
      const newCategory = facilityList[0]?.name && facilityList[0].name;
      const newLocation =
        citiesList?.children[0]?.name && citiesList?.children[0].name;
      setCategory(newCategory);
      setLocation(newLocation);
    }
  }, [successFacilityList, successCitiesList]);

  /* Get items when location and category be ready also with every change */
  useEffect(() => {
    if (category && location) {
      getFacilityItems();
    }
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
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ marginLeft: 5, minWidth: 150 }}
            >
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
                {loadingFacilityList ? (
                  <MenuItem value={0}>
                    <CircularProgress
                      size={20}
                      color="primary"
                    />
                  </MenuItem>
                ) : (
                  <MenuItem
                    value={0}
                    selected
                  >
                    {t('select.all')}
                  </MenuItem>
                )}
                {facilityList.map((item: any) => {
                  return (
                    <MenuItem
                      key={item.id}
                      value={item.id}
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
                {loadingCitiesList ? (
                  <MenuItem value={0}>
                    <CircularProgress
                      size={20}
                      color="primary"
                    />
                  </MenuItem>
                ) : (
                  citiesList?.children &&
                  citiesList?.children.map((item: any) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Container>
      {/* Facility Listing Section */}

      {loadingFacilityItems ? (
        <CircularProgress />
      ) : (
        <FacilityListingSection facilityListData={facilityList} />
      )}
    </>
  );
};

export default BookFacilityPage;
